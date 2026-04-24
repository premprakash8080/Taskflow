import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskSelected = new EventEmitter<Task>();
  @Output() toggleComplete = new EventEmitter<string>();
}
