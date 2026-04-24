import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task, Project } from 'src/app/core/models/task.model';
import { DashboardService } from '../../service/dashboard.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todayTasks: Task[] = [];
  overdueTasks: Task[] = [];
  allTasks: Task[] = [];
  projects: Project[] = [];

  breadcrumbs = [{ label: 'Home' }];

  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dashboardService.tasks$.subscribe(t => this.allTasks = t);
    this.dashboardService.todayTasks$.subscribe(t => this.todayTasks = t);
    this.dashboardService.overdueTasks$.subscribe(t => this.overdueTasks = t);
    this.dashboardService.projects$.subscribe(p => this.projects = p);
  }

  get completedCount(): number {
    return this.allTasks.filter(t => t.completed).length;
  }

  get incompleteCount(): number {
    return this.allTasks.filter(t => !t.completed).length;
  }

  openCreateTask(): void {
    this.dialog.open(CreateTaskModalComponent, { width: '560px' });
  }

  onCompleteTask(taskId: string): void {
    this.dashboardService.completeTask(taskId);
  }
}
