import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Project, Task } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

export interface MemberRow {
  assignee: any;
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMembersComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  projectId = '';
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
        switchMap(params => {
          const projectId = +params['projectId'];
          this.projectId = String(projectId);
          return this.projectsService.getProjectMembers(projectId);
        })
      ).subscribe((res: any) => {
        this.members = res.members.map((m: any) => ({
          assignee: {
            id: String(m.User.id),
            name: m.User.name,
            imgUrl: m.User.avatar_url || '',
          },
          role: m.role === 'admin' ? 'Owner' : 'Member',
          taskCount: 0,
          completedCount: 0,
        }));
        this.members = [...this.members];

        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  removeMember(member: MemberRow): void {
    if (member.role === 'Owner') return;
    this.projectsService.deleteProjectMember(this.projectId, member.assignee.id).subscribe({
      next: () => {
        this.members = this.members.filter(m => m.assignee.id !== member.assignee.id);
      },
      error: (err: any) => console.error('Failed to remove member', err),
    });
  }

  toggleInvite(): void {
    this.showInvite = !this.showInvite;
    if (!this.showInvite) this.inviteEmail = '';
  }

  sendInvite(): void {
    const email = this.inviteEmail.trim();
    if (!email || !this.projectId) return;

    this.projectsService.addProjectMember(this.projectId, email).subscribe({
      next: (res: any) => {
        const member = res.member;
        this.members = [
          ...this.members,
          {
            assignee: {
              id: String(member.User.id),
              name: member.User.name,
              imgUrl: member.User.avatar_url || '',
            },
            role: member.role === 'admin' ? 'Owner' : 'Member',
            taskCount: 0,
            completedCount: 0,
          },
        ];
        this.inviteEmail = '';
        this.showInvite = false;
      },
      error: (err: any) => console.error('Failed to invite member', err),
    });
  }

  clearInvite(): void {
    this.inviteEmail = '';
    this.showInvite = false;
  }

  roleColor(role: string): string {
    return ROLE_COLORS[role] ?? '#64748b';
  }

  avatarInitials(name: string): string {
    return name.split(' ').map((p: string) => p[0]).slice(0, 2).join('').toUpperCase();
  }

  avatarColor(id: string): string {
    const palette = ['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#0ea5e9','#ec4899'];
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
    return palette[Math.abs(h) % palette.length];
  }
}
