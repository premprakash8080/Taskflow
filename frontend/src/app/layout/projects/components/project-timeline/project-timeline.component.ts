import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Task, Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

const DAY_W = 40; // px per day column

export interface GanttDay {
  date: Date;
  label: string;
  isToday: boolean;
  isWeekend: boolean;
  isMonthStart: boolean;
  monthLabel: string;
}

export interface GanttBar {
  task: Task;
  leftPx: number;
  widthPx: number;
  color: string;
  label: string;
}

export interface GanttSection {
  id: string;
  label: string;
  bars: GanttBar[];
  expanded: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  today:             'Today',
  upcoming:          'Upcoming',
  later:             'Later',
  recently_assigned: 'Recently Assigned',
  col_backlog:       'Backlog',
  col_inprogress:    'In Progress',
  col_review:        'In Review',
  col_done:          'Done',
};

@Component({
  selector: 'vex-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss']
})
export class ProjectTimelineComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('scrollPane') scrollPane!: ElementRef<HTMLElement>;
  @ViewChild('headerDates') headerDates!: ElementRef<HTMLElement>;

  project: Project | undefined;
  days: GanttDay[] = [];
  sections: GanttSection[] = [];
  todayLeftPx = 0;
  totalWidthPx = 0;

  private rangeStart!: Date;
  private scrollListener?: () => void;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => combineLatest([
          this.projectsService.getProject(params['projectId']),
          this.projectsService.getTasksForProject(params['projectId']),
        ]))
      ).subscribe(([project, tasks]) => {
        this.project = project;
        this.buildGantt(tasks);
        this.cd.markForCheck();
      })
    );
  }

  ngAfterViewInit(): void {
    // Sync horizontal scroll between header and body grid
    this.scrollListener = () => {
      if (this.headerDates?.nativeElement) {
        this.headerDates.nativeElement.scrollLeft = this.scrollPane.nativeElement.scrollLeft;
      }
    };
    this.scrollPane?.nativeElement.addEventListener('scroll', this.scrollListener);
    // Scroll to today on load
    setTimeout(() => this.scrollToToday(), 100);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.scrollListener) {
      this.scrollPane?.nativeElement.removeEventListener('scroll', this.scrollListener);
    }
  }

  private buildGantt(tasks: Task[]): void {
    const today = this.startOfDay(new Date());

    // Date range: 7 days before earliest task start → 14 days after latest due date
    const starts = tasks.map(t => this.startOfDay(t.createdAt));
    const ends   = tasks.filter(t => t.dueDate).map(t => this.startOfDay(t.dueDate!));

    const allDates = [...starts, ...ends, today];
    const minDate  = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate  = new Date(Math.max(...allDates.map(d => d.getTime())));

    // Padding
    this.rangeStart = this.addDays(minDate, -7);
    const rangeEnd  = this.addDays(maxDate, 14);

    const numDays = this.diffDays(rangeEnd, this.rangeStart) + 1;
    this.totalWidthPx = numDays * DAY_W;

    // Build day array
    this.days = [];
    for (let i = 0; i < numDays; i++) {
      const d = this.addDays(this.rangeStart, i);
      this.days.push({
        date: d,
        label: String(d.getDate()),
        isToday: this.diffDays(d, today) === 0,
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
        isMonthStart: d.getDate() === 1,
        monthLabel: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
      });
    }

    this.todayLeftPx = this.diffDays(today, this.rangeStart) * DAY_W;

    // Build sections
    const sectionMap = new Map<string, GanttBar[]>();
    for (const task of tasks) {
      if (!sectionMap.has(task.sectionId)) sectionMap.set(task.sectionId, []);
      const start = this.startOfDay(task.createdAt);
      const end   = task.dueDate ? this.startOfDay(task.dueDate) : this.addDays(start, 1);
      const leftPx  = this.diffDays(start, this.rangeStart) * DAY_W;
      const widthPx = Math.max(this.diffDays(end, start), 1) * DAY_W;
      sectionMap.get(task.sectionId)!.push({
        task,
        leftPx,
        widthPx,
        color: this.barColor(task),
        label: task.name,
      });
    }

    const existingSections = new Map(this.sections.map(s => [s.id, s.expanded]));
    this.sections = Array.from(sectionMap.entries()).map(([id, bars]) => ({
      id,
      label: SECTION_LABELS[id] ?? id,
      bars,
      expanded: existingSections.get(id) ?? true,
    }));
  }

  toggleSection(section: GanttSection): void {
    section.expanded = !section.expanded;
  }

  scrollToToday(): void {
    if (this.scrollPane?.nativeElement) {
      const centerOffset = this.scrollPane.nativeElement.clientWidth / 2;
      this.scrollPane.nativeElement.scrollLeft = Math.max(0, this.todayLeftPx - centerOffset);
    }
  }

  priorityColor(p: string): string {
    return { high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8' }[p] ?? '#94a3b8';
  }

  private barColor(task: Task): string {
    if (this.project?.color) return this.project.color;
    return this.priorityColor(task.priority);
  }

  private startOfDay(d: Date): Date {
    const r = new Date(d);
    r.setHours(0, 0, 0, 0);
    return r;
  }

  private addDays(d: Date, n: number): Date {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }

  private diffDays(a: Date, b: Date): number {
    return Math.round((a.getTime() - b.getTime()) / 86400000);
  }

  get dayW(): number { return DAY_W; }

  // Month spans for the top header row
  get monthSpans(): { label: string; widthPx: number }[] {
    const spans: { label: string; widthPx: number }[] = [];
    let cur = '';
    let count = 0;
    for (const d of this.days) {
      const label = d.date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (label !== cur) {
        if (cur) spans.push({ label: cur, widthPx: count * DAY_W });
        cur = label; count = 1;
      } else {
        count++;
      }
    }
    if (cur) spans.push({ label: cur, widthPx: count * DAY_W });
    return spans;
  }
}
