import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {
  @Input() tasks: Task[] = [];
  @Input() label = 'Tasks';
  @Output() completeTask = new EventEmitter<string>();

  expanded = true;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
