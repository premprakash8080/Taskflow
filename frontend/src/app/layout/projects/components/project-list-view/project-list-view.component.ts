import { Component, OnDestroy, OnInit, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export interface ListSection {
  id: string;
  name: string;
  expanded: boolean;
  tasks: Task[];
}

// ── Column configuration ───────────────────────────────────────────────────────
export type ResizableCol = 'name' | 'assignee' | 'due' | 'priority' | 'status';

interface ColConfig {
  min: number;
  max: number;
  default: number;
}

const COL_CONFIG: Record<ResizableCol, ColConfig> = {
  name:     { min: 160, max: 640, default: 340 },
  assignee: { min: 80,  max: 300, default: 180 },
  due:      { min: 80,  max: 200, default: 120 },
  priority: { min: 70,  max: 180, default: 100 },
  status:   { min: 80,  max: 200, default: 130 },
};

const LS_KEY = 'taskflow-lv-col-widths';

@Component({
  selector: 'vex-project-list-view',
  templateUrl: './project-list-view.component.html',
  styleUrls: ['./project-list-view.component.scss']
})
export class ProjectListViewComponent implements OnInit, AfterViewInit, OnDestroy {

  sections: ListSection[] = [];
  selectedTask: Task | null = null;
  projectId = '';

  // ── Add-task state ──────────────────────────────────────────────────────────
  addingSection: string | null = null;
  newTaskName = '';

  // ── Column widths (px) — check is always 40px fixed ────────────────────────
  colWidths: Record<ResizableCol, number> = {
    name:     COL_CONFIG.name.default,
    assignee: COL_CONFIG.assignee.default,
    due:      COL_CONFIG.due.default,
    priority: COL_CONFIG.priority.default,
    status:   COL_CONFIG.status.default,
  };

  // Resize drag state
  private resizing: ResizableCol | null = null;
  private resizeStartX = 0;
  private resizeStartW = 0;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) {}

  // ── Lifecycle ───────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadWidths();

    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => {
          this.projectId = params['projectId'];
          this.addingSection = null;
          this.newTaskName = '';
          return this.projectsService.getTasksForProject(this.projectId);
        })
      ).subscribe(tasks => {
        const expandedIds = new Set(
          this.sections.filter(s => s.expanded).map(s => s.id)
        );
        this.sections = this.buildSections(tasks, expandedIds);
      })
    );

    this.subs.add(
      this.projectsService.selectedTask$.subscribe(task => {
        this.selectedTask = task;
      })
    );

    // "Add task" button in the project header
    this.subs.add(
      this.projectsService.addTaskRequest$.subscribe(() => {
        const first = this.sections[0];
        if (!first) return;
        first.expanded = true;
        this.startAddTask(first.id);
      })
    );
  }

  ngAfterViewInit(): void {
    // Apply the (possibly restored) widths to the CSS variable immediately
    this.applyGrid();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Grid CSS variable ───────────────────────────────────────────────────────

  /** Compute and apply --lv-grid to the host element. Direct DOM — no CD. */
  private applyGrid(): void {
    const { name, assignee, due, priority, status } = this.colWidths;
    const tpl = `40px ${name}px ${assignee}px ${due}px ${priority}px ${status}px`;
    this.el.nativeElement.style.setProperty('--lv-grid', tpl);
  }

  // ── Column resize ───────────────────────────────────────────────────────────

  onResizeStart(event: MouseEvent, col: ResizableCol): void {
    event.preventDefault();
    event.stopPropagation();

    this.resizing    = col;
    this.resizeStartX = event.clientX;
    this.resizeStartW = this.colWidths[col];

    // Run listeners OUTSIDE Angular zone — no change detection per pixel
    this.zone.runOutsideAngular(() => {
      const onMove = (e: MouseEvent) => {
        const col = this.resizing;
        if (!col) return;
        const delta = e.clientX - this.resizeStartX;
        const { min, max } = COL_CONFIG[col];
        const newW = Math.min(max, Math.max(min, this.resizeStartW + delta));
        this.colWidths = { ...this.colWidths, [col]: newW };
        this.applyGrid(); // direct DOM write — smooth 60fps
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        // Re-enter zone only to save
        this.zone.run(() => {
          this.resizing = null;
          this.saveWidths();
        });
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  // ── Persist widths ──────────────────────────────────────────────────────────

  private saveWidths(): void {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this.colWidths));
    } catch {}
  }

  private loadWidths(): void {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Record<ResizableCol, number>>;
      for (const col of Object.keys(COL_CONFIG) as ResizableCol[]) {
        const v = saved[col];
        if (v != null) {
          const { min, max } = COL_CONFIG[col];
          this.colWidths[col] = Math.min(max, Math.max(min, v));
        }
      }
    } catch {}
  }

  // ── Section build ───────────────────────────────────────────────────────────

  private buildSections(tasks: Task[], expandedIds: Set<string>): ListSection[] {
    const sectionMap = new Map<string, Task[]>();

    for (const task of tasks) {
      const key = task.sectionId || 'default';
      if (!sectionMap.has(key)) sectionMap.set(key, []);
      sectionMap.get(key)!.push(task);
    }

    if (sectionMap.size === 0) {
      return [{ id: 'default', name: 'Tasks', expanded: true, tasks: [] }];
    }

    return Array.from(sectionMap.entries()).map(([id, tasks]) => ({
      id,
      name: this.sectionLabel(id),
      expanded: expandedIds.size === 0 ? true : (expandedIds.has(id) || !this.sections.find(s => s.id === id)),
      tasks
    }));
  }

  private sectionLabel(id: string): string {
    const labels: Record<string, string> = {
      today: 'Today', upcoming: 'Upcoming', later: 'Later',
      col_backlog: 'Backlog', col_inprogress: 'In Progress',
      col_review: 'Review', col_done: 'Done', default: 'Tasks',
      recently_assigned: 'Recently Assigned',
    };
    return labels[id] ?? id;
  }

  // ── Section collapse ────────────────────────────────────────────────────────

  toggleSection(section: ListSection): void {
    section.expanded = !section.expanded;
  }

  // ── Add-task flow ───────────────────────────────────────────────────────────

  startAddTask(sectionId: string, event?: MouseEvent): void {
    event?.stopPropagation();
    this.addingSection = sectionId;
    this.newTaskName = '';
  }

  cancelAddTask(): void {
    this.addingSection = null;
    this.newTaskName = '';
  }

  commitAddTask(): void {
    const name = this.newTaskName.trim();
    const sectionId = this.addingSection;
    // Reset FIRST — service is synchronous
    this.addingSection = null;
    this.newTaskName = '';
    if (name && sectionId) {
      this.projectsService.addTask(this.projectId, name, sectionId);
    }
  }

  onAddTaskKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') { event.preventDefault(); this.commitAddTask(); }
    else if (event.key === 'Escape') { this.cancelAddTask(); }
  }

  onInputBlur(): void {
    if (this.addingSection !== null) this.commitAddTask();
  }

  // ── Task actions ────────────────────────────────────────────────────────────

  selectTask(task: Task): void {
    const isSame = this.selectedTask?.id === task.id;
    this.projectsService.selectTask(isSame ? null : task);
  }

  toggleComplete(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    this.projectsService.toggleComplete(task.id);
  }

  // ── Display helpers ─────────────────────────────────────────────────────────

  priorityColor(p: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8'
    };
    return map[p] ?? '#94a3b8';
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = {
      todo: 'To do', in_progress: 'In progress', completed: 'Done'
    };
    return map[s] ?? s;
  }

  statusClass(s: string): string { return 'status--' + s; }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    const d = new Date(date); d.setHours(0, 0, 0, 0);
    const t = new Date();     t.setHours(0, 0, 0, 0);
    return d < t;
  }

  isToday(date?: Date): boolean {
    if (!date) return false;
    return new Date(date).toDateString() === new Date().toDateString();
  }

  get totalTasks(): number {
    return this.sections.reduce((n, s) => n + s.tasks.length, 0);
  }

  avatarError: Record<string, boolean> = {};

  avatarInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  avatarColor(id: string): string {
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];
    let n = 0;
    for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
    return colors[n % colors.length];
  }
}
