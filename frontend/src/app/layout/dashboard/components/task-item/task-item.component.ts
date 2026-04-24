import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-dashboard-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() complete = new EventEmitter<string>();

  priorityColor(priority: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8'
    };
    return map[priority] ?? '#94a3b8';
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date() &&
      new Date(date).toDateString() !== new Date().toDateString();
  }
}
