import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Task, TaskFilter, TaskSection } from 'src/app/core/models/task.model';
import { MyTasksService } from '../../service/my-tasks.service';

@Component({
  selector: 'vex-my-tasks-main',
  templateUrl: './my-tasks-main.component.html',
  styleUrls: ['./my-tasks-main.component.scss']
})
export class MyTasksMainComponent implements OnInit {
  @ViewChild('detailDrawer') detailDrawer!: MatDrawer;

  sections: TaskSection[] = [];
  selectedTask: Task | null = null;
  activeFilter: TaskFilter = 'incomplete';
  breadcrumbs = [{ label: 'My Tasks' }];

  constructor(private myTasksService: MyTasksService) {}

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.myTasksService.getSections(this.activeFilter).subscribe(s => {
      this.sections = s;
    });
  }

  onFilterChange(filter: TaskFilter): void {
    this.activeFilter = filter;
    this.loadSections();
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.detailDrawer.open();
  }

  closeDetail(): void {
    this.selectedTask = null;
    this.detailDrawer.close();
  }

  onTaskUpdate(task: Task): void {
    this.myTasksService.updateTask(task);
    this.selectedTask = task;
  }

  onToggleComplete(taskId: string): void {
    this.myTasksService.toggleComplete(taskId);
    if (this.selectedTask?.id === taskId) {
      const t = this.selectedTask;
      this.selectedTask = { ...t, completed: !t.completed };
    }
  }
}
