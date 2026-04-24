import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss']
})
export class InboxDetailComponent {
  @Input() notification!: Notification;

  constructor(private router: Router) {}

  goToTask(): void {
    if (this.notification.projectId) {
      this.router.navigate(['/projects', this.notification.projectId, 'list']);
    }
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

  typeLabel(type: string): string {
    const map: Record<string, string> = {
      assigned: 'Task assigned', mentioned: 'Mentioned in comment',
      completed: 'Task completed', comment: 'New comment', due_soon: 'Due soon'
    };
    return map[type] ?? type;
  }
}
