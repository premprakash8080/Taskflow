import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-my-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    // Prevent row click from firing when clicking the checkbox
    event.stopPropagation();
  }

  onCheckboxChange(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleComplete.emit(this.task.id);
  }

  priorityColor(priority: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: 'transparent'
    };
    return map[priority] ?? 'transparent';
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date() &&
      new Date(date).toDateString() !== new Date().toDateString();
  }

  isDueToday(date?: Date): boolean {
    if (!date) return false;
    return new Date(date).toDateString() === new Date().toDateString();
  }
}
