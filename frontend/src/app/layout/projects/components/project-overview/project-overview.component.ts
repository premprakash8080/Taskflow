import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Project, Task, TaskAssignee } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export interface StatusUpdate {
  id: string;
  author: TaskAssignee;
  status: string;
  body: string;
  createdAt: Date;
}

@Component({
  selector: 'vex-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  tasks: Task[] = [];
  statusUpdates: StatusUpdate[] = [];
  newUpdateBody = '';
  editingBrief = false;
  briefDraft = '';
  projectMembers: any[] = [];

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  this.subs.add(
    this.route.parent!.params.pipe(
      switchMap(params => {
        const projectId = params['projectId'];

        // ⬅️ Members load karo
        this.projectsService.getProjectMembers(+projectId).subscribe((res: any) => {
          this.projectMembers = res.members.map((m: any) => ({
            id: String(m.User.id),
            name: m.User.name,
            imgUrl: m.User.avatar_url || '',
          }));
          this.cd.markForCheck();
        });

        return combineLatest([
          this.projectsService.getProject(projectId),
          this.projectsService.getTasksForProject(projectId),
        ]);
      })
    ).subscribe(([project, tasks]) => {
      const projectChanged = !this.project || this.project.id !== project?.id;
      this.project = project;
      this.tasks = tasks;
      if (projectChanged) {
        this.briefDraft = project?.description ?? '';
        this.loadMockUpdates(project);
      }
      this.cd.markForCheck();
    })
  );
}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Computed values ─────────────────────────────────────────────────────────

  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get totalCount(): number {
    return this.tasks.length || this.project?.taskCount || 0;
  }

  get progressPct(): number {
    if (!this.totalCount) return 0;
    return Math.round((this.completedCount / this.totalCount) * 100);
  }

  get progressDash(): string {
    const r = 36;
    const circ = 2 * Math.PI * r;
    const filled = (this.progressPct / 100) * circ;
    return `${filled} ${circ}`;
  }

  get circumference(): number {
    return 2 * Math.PI * 36;
  }

  get overdueCount(): number {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return this.tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < today).length;
  }

  get dueSoonCount(): number {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const week  = new Date(today.getTime() + 7 * 86400000);
    return this.tasks.filter(t =>
      !t.completed && t.dueDate &&
      new Date(t.dueDate) >= today && new Date(t.dueDate) <= week
    ).length;
  }

  statusLabel(s: string): string {
    return { on_track: 'On track', at_risk: 'At risk', off_track: 'Off track' }[s] ?? s;
  }

  statusColor(s: string): string {
    return { on_track: '#10b981', at_risk: '#f59e0b', off_track: '#ef4444' }[s] ?? '#94a3b8';
  }

  avatarInitials(name: string): string {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  avatarColor(id: string): string {
    const palette = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
    return palette[Math.abs(h) % palette.length];
  }

  // ── Brief editing ────────────────────────────────────────────────────────────

  startEditBrief(): void {
    this.briefDraft = this.project?.description ?? '';
    this.editingBrief = true;
  }

  saveBrief(): void {
    if (!this.project) return;
    const updated = { ...this.project, description: this.briefDraft.trim() };
    this.projectsService.updateProject(updated);
    this.editingBrief = false;
  }

  cancelBrief(): void {
    this.editingBrief = false;
    this.briefDraft = this.project?.description ?? '';
  }

  // ── Status updates ───────────────────────────────────────────────────────────

  postUpdate(): void {
    const body = this.newUpdateBody.trim();
    if (!body || !this.project) return;
    this.statusUpdates = [{
      id: 'u' + Date.now(),
      author: { id: 'u1', name: 'David Smith', imgUrl: 'assets/img/demo/1.jpg' },
      status: this.project.status,
      body,
      createdAt: new Date(),
    }, ...this.statusUpdates];
    this.newUpdateBody = '';
    this.cd.markForCheck();
  }

  private loadMockUpdates(project?: Project): void {
    if (!project) return;
    const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);
    this.statusUpdates = [
      {
        id: 'u_init',
        author: { id: 'u1', name: 'David Smith', imgUrl: 'assets/img/demo/1.jpg' },
        status: project.status,
        body: `Kicked off ${project.name}. Team is aligned on goals and scope. Initial tasks have been assigned and the timeline is confirmed.`,
        createdAt: daysAgo(3),
      },
    ];
  }

  timeAgo(date: Date): string {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }
}
