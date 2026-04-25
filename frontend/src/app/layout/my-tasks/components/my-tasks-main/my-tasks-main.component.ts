import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Task, TaskFilter, TaskSection } from 'src/app/core/models/task.model';
import { MyTasksService } from '../../service/my-tasks.service';

type ViewTab = 'list' | 'board' | 'calendar' | 'files';

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
  activeView: ViewTab = 'list';

  viewTabs: { value: ViewTab; label: string; icon: string }[] = [
    { value: 'list',     label: 'List',     icon: 'view_list' },
    { value: 'board',    label: 'Board',    icon: 'view_column' },
    { value: 'calendar', label: 'Calendar', icon: 'calendar_today' },
    { value: 'files',    label: 'Files',    icon: 'folder_open' },
  ];

  constructor(private myTasksService: MyTasksService) {}

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.myTasksService.getSections(this.activeFilter).subscribe(s => {
      this.sections = s;
    });
  }

  setView(view: ViewTab): void {
    this.activeView = view;
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
