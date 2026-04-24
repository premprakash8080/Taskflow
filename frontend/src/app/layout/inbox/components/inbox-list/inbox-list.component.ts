import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent {
  @Input() notifications: Notification[] = [];
  @Input() selectedId: string | null = null;
  @Output() select = new EventEmitter<Notification>();
}
