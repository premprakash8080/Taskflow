import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-my-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<string>();
  avatarError = false;

  onCheckboxChange(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleComplete.emit(this.task.id);
  }

  typeColor(priority: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#6b7280'
    };
    return map[priority] ?? '#6b7280';
  }

  projectColor(projectId?: string): string {
    const palette = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#f97316', '#ec4899', '#06b6d4'];
    if (!projectId) return palette[0];
    const idx = Math.abs(projectId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % palette.length;
    return palette[idx];
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }

  isDueToday(date?: Date): boolean {
    if (!date) return false;
    return new Date(date).toDateString() === new Date().toDateString();
  }
}
