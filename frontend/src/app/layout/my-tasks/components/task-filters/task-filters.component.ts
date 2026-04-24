import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskFilter } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent {
  @Input() activeFilter: TaskFilter = 'incomplete';
  @Output() filterChange = new EventEmitter<TaskFilter>();

  filters: { value: TaskFilter; label: string }[] = [
    { value: 'all',        label: 'All Tasks' },
    { value: 'incomplete', label: 'Incomplete' },
    { value: 'completed',  label: 'Completed' },
    { value: 'today',      label: 'Due Today' },
  ];

  setFilter(filter: TaskFilter): void {
    this.filterChange.emit(filter);
  }
}
