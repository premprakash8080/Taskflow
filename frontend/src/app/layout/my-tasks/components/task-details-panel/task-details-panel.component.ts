import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Task, TaskSubtask } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-task-details-panel',
  templateUrl: './task-details-panel.component.html',
  styleUrls: ['./task-details-panel.component.scss']
})
export class TaskDetailsPanelComponent implements OnChanges {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() taskUpdate = new EventEmitter<Task>();
  @Output() toggleComplete = new EventEmitter<string>();

  editingName = false;
  editingDesc = false;
  newSubtaskName = '';
  draftName = '';
  draftDesc = '';

  ngOnChanges(): void {
    this.editingName = false;
    this.editingDesc = false;
    this.newSubtaskName = '';
  }

  startEditName(): void {
    this.draftName = this.task.name;
    this.editingName = true;
  }

  saveName(): void {
    if (this.draftName.trim()) {
      this.taskUpdate.emit({ ...this.task, name: this.draftName.trim() });
    }
    this.editingName = false;
  }

  startEditDesc(): void {
    this.draftDesc = this.task.description ?? '';
    this.editingDesc = true;
  }

  saveDesc(): void {
    this.taskUpdate.emit({ ...this.task, description: this.draftDesc });
    this.editingDesc = false;
  }

  addSubtask(): void {
    if (!this.newSubtaskName.trim()) return;
    const subtask: TaskSubtask = {
      id: 'st_' + Date.now(),
      name: this.newSubtaskName.trim(),
      completed: false,
    };
    const subtasks = [...(this.task.subtasks ?? []), subtask];
    this.taskUpdate.emit({ ...this.task, subtasks });
    this.newSubtaskName = '';
  }

  toggleSubtask(subtask: TaskSubtask): void {
    const subtasks = (this.task.subtasks ?? []).map(s =>
      s.id === subtask.id ? { ...s, completed: !s.completed } : s
    );
    this.taskUpdate.emit({ ...this.task, subtasks });
  }

  priorityLabel(p: string): string {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

  priorityColor(p: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#94a3b8'
    };
    return map[p] ?? '#94a3b8';
  }

  completedSubtasks(): number {
    return (this.task.subtasks ?? []).filter(s => s.completed).length;
  }
}
