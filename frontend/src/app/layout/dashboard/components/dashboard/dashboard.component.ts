import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Task, Project } from 'src/app/core/models/task.model';
import { DashboardService } from '../../service/dashboard.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

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

  people: Person[] = [
    { name: 'madhurikalaiwe',  role: 'Designer',     imgUrl: 'assets/img/avatars/1.jpg', initials: 'M', color: '#6366f1' },
    { name: 'Shreya Parekh',   role: 'Developer',    imgUrl: 'assets/img/avatars/2.jpg', initials: 'S', color: '#10b981' },
    { name: 'Azan Hazan Khan', role: 'PM',           imgUrl: 'assets/img/avatars/3.jpg', initials: 'A', color: '#f59e0b' },
    { name: 'Shilpa Kancharu', role: 'QA',           imgUrl: 'assets/img/avatars/4.jpg', initials: 'S', color: '#ef4444' },
    { name: 'Emmanuel Reality',role: 'Backend',      imgUrl: 'assets/img/avatars/5.jpg', initials: 'E', color: '#8b5cf6' },
    { name: 'Saurabh P',       role: 'DevOps',       imgUrl: 'assets/img/avatars/1.jpg', initials: 'S', color: '#06b6d4' },
    { name: 'Biswajit Datta',  role: 'Frontend',     imgUrl: 'assets/img/avatars/2.jpg', initials: 'B', color: '#f97316' },
    { name: 'Kumar Aditya',    role: 'Designer',     imgUrl: 'assets/img/avatars/3.jpg', initials: 'K', color: '#84cc16' },
    { name: 'Aman Shahid',     role: 'Analyst',      imgUrl: 'assets/img/avatars/4.jpg', initials: 'A', color: '#ec4899' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.tasks$.subscribe(t => this.allTasks = t);
    this.dashboardService.projects$.subscribe(p => this.projects = p);
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
