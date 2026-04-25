import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export interface CalendarDay {
  date: Date | null; // null = padding cell
  isToday: boolean;
  isCurrentMonth: boolean;
  tasks: Task[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
  selector: 'vex-project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCalendarComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  tasks: Task[] = [];

  viewDate = new Date();           // currently displayed month
  weeks: CalendarWeek[] = [];
  weekdays = WEEKDAYS;

  selectedTask: Task | null = null;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.subscribe(params => {
        const projectId = params['projectId'];

        this.subs.add(
          this.projectsService.getProject(projectId).subscribe(p => {
            this.project = p;
            this.cd.markForCheck();
          })
        );

        this.subs.add(
          this.projectsService.getTasksForProject(projectId).subscribe(tasks => {
            this.tasks = tasks;
            this.buildCalendar();
            this.cd.markForCheck();
          })
        );
      })
    );

    this.subs.add(
      this.projectsService.selectedTask$.subscribe(task => {
        this.selectedTask = task;
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.buildCalendar();
    this.cd.markForCheck();
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.buildCalendar();
    this.cd.markForCheck();
  }

  goToToday(): void {
    this.viewDate = new Date();
    this.buildCalendar();
    this.cd.markForCheck();
  }

  get monthLabel(): string {
    return this.viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  get isCurrentMonth(): boolean {
    const now = new Date();
    return this.viewDate.getMonth() === now.getMonth() &&
           this.viewDate.getFullYear() === now.getFullYear();
  }

  // ── Calendar build ──────────────────────────────────────────────────────────

  private buildCalendar(): void {
    const year  = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);

    // Leading padding (0 = Sunday)
    const leadPad = firstDay.getDay();
    // Trailing padding to fill last week
    const trailPad = (7 - ((leadPad + lastDay.getDate()) % 7)) % 7;

    const totalCells = leadPad + lastDay.getDate() + trailPad;
    this.weeks = [];

    let week: CalendarDay[] = [];

    for (let i = 0; i < totalCells; i++) {
      const dayIdx = i - leadPad + 1;
      const isCurrentMonth = dayIdx >= 1 && dayIdx <= lastDay.getDate();
      const date = isCurrentMonth ? new Date(year, month, dayIdx) : null;

      const tasks = date
        ? this.tasks.filter(t => t.dueDate && this.sameDay(new Date(t.dueDate), date))
        : [];

      week.push({
        date,
        isToday: !!date && this.sameDay(date, today),
        isCurrentMonth,
        tasks,
      });

      if (week.length === 7) {
        this.weeks.push({ days: week });
        week = [];
      }
    }
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  // ── Task interaction ────────────────────────────────────────────────────────

  selectTask(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    const isSame = this.selectedTask?.id === task.id;
    this.projectsService.selectTask(isSame ? null : task);
  }

  // ── Display helpers ─────────────────────────────────────────────────────────

  priorityColor(p: string): string {
    return { high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8' }[p] ?? '#94a3b8';
  }

  taskColor(task: Task): string {
    return this.project?.color ?? this.priorityColor(task.priority);
  }

  trackByDate(_: number, day: CalendarDay): string {
    return day.date?.toISOString() ?? 'null';
  }
}
