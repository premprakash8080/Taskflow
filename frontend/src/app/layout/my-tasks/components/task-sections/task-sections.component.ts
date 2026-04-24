import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskSection } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-task-sections',
  templateUrl: './task-sections.component.html',
  styleUrls: ['./task-sections.component.scss']
})
export class TaskSectionsComponent {
  @Input() sections: TaskSection[] = [];
  @Output() taskSelected = new EventEmitter<Task>();
  @Output() toggleComplete = new EventEmitter<string>();

  toggleSection(section: TaskSection): void {
    section.expanded = !section.expanded;
  }

  allSectionsEmpty(): boolean {
    return this.sections.every(s => s.tasks.length === 0);
  }
}
