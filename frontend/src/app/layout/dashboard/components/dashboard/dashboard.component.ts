import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Task, Project } from 'src/app/core/models/task.model';
import { DashboardService } from '../../service/dashboard.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { AuthenticationService } from 'src/app/auth/service/auth.service';

type TaskTab = 'upcoming' | 'overdue' | 'completed';

interface Person {
  name: string;
  role: string;
  imgUrl: string;
  initials: string;
  color: string;
}

@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allTasks: Task[] = [];
  projects: Project[] = [];
  activeTab: TaskTab = 'upcoming';
  greeting = this.getGreeting();
  today = new Date();
  currentUserName: string= '';
  people: Person[]= [];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private router: Router,
    private userSessionService: UserSessionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.dashboardService.tasks$.subscribe(t => this.allTasks = t);
    // this.dashboardService.projects$.subscribe(p => this.projects = p);

    const session = this.userSessionService.userSession;
    this.currentUserName = session?.name || 'User';

    this.loadTeamMembers();
    this.GetProjectsByWorkspace();
  }

  loadTeamMembers(): void {
    this.dashboardService.getTeamMembers().subscribe({
      next: (res: any) => {
        console.log('team member response:', res);
        const colors = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16','#ec4899'];
        this.people = res.members.map((member: any, index: number) => ({
          name: member.name,
          role: member.email,
          initials: member.name.charAt(0).toUpperCase(),
          color: colors[index % colors.length],
          imgUrl: member.avatar_url || ''
        }));
      },
      error: (err: any) => {
        console.error('Failed to load team members', err);
      }
    });
  }


  GetProjectsByWorkspace(): void {
    this.dashboardService.GetProjectsByWorkspace().subscribe({
      next: (res: any) => {

        console.log("res projects", res)
        this.projects = res.projects.map((project: any, index: number) => ({
          name: project.name,
          initials: project.name.charAt(0).toUpperCase(),
          color: project.color,
        }));
      },
      error: (err: any) => {
        console.error('Failed to load team members', err);
      }
    });
  }
  

  get filteredTasks(): Task[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    switch (this.activeTab) {
      case 'upcoming':
        return this.allTasks.filter(t =>
          !t.completed && t.dueDate && new Date(t.dueDate) >= today
        );
      case 'overdue':
        return this.allTasks.filter(t =>
          !t.completed && t.dueDate && new Date(t.dueDate) < today
        );
      case 'completed':
        return this.allTasks.filter(t => t.completed);
    }
  }

  get overdueCount(): number {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.allTasks.filter(t =>
      !t.completed && t.dueDate && new Date(t.dueDate) < today
    ).length;
  }

  setTab(tab: TaskTab): void {
    this.activeTab = tab;
  }

  completeTask(taskId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.dashboardService.completeTask(taskId);
  }

  goToMyTasks(): void {
    this.router.navigate(['/my-tasks']);
  }

  goToProject(project: Project): void {
    this.router.navigate(['/projects', project.id, 'overview']);
  }

  openCreateTask(): void {
    this.dialog.open(CreateTaskModalComponent, { width: '560px' });
  }

  projectInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }

  isToday(date?: Date): boolean {
    if (!date) return false;
    return new Date(date).toDateString() === new Date().toDateString();
  }

  tagColor(projectId?: string): string {
    const palette = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];
    if (!projectId) return palette[0];
    const idx = Math.abs(projectId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % palette.length;
    return palette[idx];
  }

  private getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
