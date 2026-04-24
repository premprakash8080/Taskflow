import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/core/models/task.model';
import { InboxService } from 'src/app/layout/inbox/service/inbox.service';

@Component({
  selector: 'vex-activity-panel',
  templateUrl: './activity-panel.component.html',
  styleUrls: ['./activity-panel.component.scss']
})
export class ActivityPanelComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private inboxService: InboxService) {}

  ngOnInit(): void {
    this.inboxService.getFiltered('all').subscribe(ns => {
      this.notifications = ns.slice(0, 5);
    });
  }

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      assigned: 'person_add', mentioned: 'alternate_email',
      completed: 'check_circle', comment: 'chat_bubble', due_soon: 'schedule'
    };
    return map[type] ?? 'notifications';
  }

  typeColor(type: string): string {
    const map: Record<string, string> = {
      assigned: '#6366f1', mentioned: '#f59e0b',
      completed: '#10b981', comment: '#3b82f6', due_soon: '#ef4444'
    };
    return map[type] ?? '#94a3b8';
  }
}
