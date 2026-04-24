import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project-list-view',
  templateUrl: './project-list-view.component.html',
  styleUrls: ['./project-list-view.component.scss']
})
export class ProjectListViewComponent implements OnInit {
  displayedColumns = ['complete', 'name', 'assignee', 'dueDate', 'priority', 'status'];
  dataSource = new MatTableDataSource<Task>([]);
  selectedTask: Task | null = null;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.projectsService.getTasksForProject(params['projectId']).subscribe(tasks => {
        this.dataSource.data = tasks;
      });
    });
  }

  toggleComplete(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    const updated = { ...task, completed: !task.completed };
    this.dataSource.data = this.dataSource.data.map(t => t.id === task.id ? updated : t);
  }

  selectRow(task: Task): void {
    this.selectedTask = this.selectedTask?.id === task.id ? null : task;
  }

  priorityColor(p: string): string {
    const map: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8' };
    return map[p] ?? '#94a3b8';
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
  }
}
