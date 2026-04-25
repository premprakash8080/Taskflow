import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Project, Task, TaskAssignee } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export interface MemberRow {
  assignee: TaskAssignee;
  role: 'Owner' | 'Member';
  taskCount: number;
  completedCount: number;
}

const ROLE_COLORS: Record<string, string> = {
  Owner:  '#6366f1',
  Member: '#64748b',
};

@Component({
  selector: 'vex-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMembersComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  members: MemberRow[] = [];
  inviteEmail = '';
  showInvite = false;

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
        this.buildMembers(project, tasks);
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private buildMembers(project?: Project, tasks: Task[] = []): void {
    if (!project) return;
    this.members = project.members.map((assignee, idx) => ({
      assignee,
      role: idx === 0 ? 'Owner' : 'Member',
      taskCount: tasks.filter(t => t.assignee?.id === assignee.id).length,
      completedCount: tasks.filter(t => t.assignee?.id === assignee.id && t.completed).length,
    }));
  }

  removeMember(member: MemberRow): void {
    if (member.role === 'Owner') return;
    this.projectsService.removeProjectMember(this.project!.id, member.assignee.id);
  }

  toggleInvite(): void {
    this.showInvite = !this.showInvite;
    if (!this.showInvite) this.inviteEmail = '';
  }

  sendInvite(): void {
    // UI-only: in a real app would call an API
    this.inviteEmail = '';
    this.showInvite = false;
  }

  roleColor(role: string): string {
    return ROLE_COLORS[role] ?? '#64748b';
  }

  avatarInitials(name: string): string {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  avatarColor(id: string): string {
    const palette = ['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#0ea5e9','#ec4899'];
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
    return palette[Math.abs(h) % palette.length];
  }
}
