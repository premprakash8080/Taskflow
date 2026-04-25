import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-inbox-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss']
})
export class InboxDetailComponent {
  @Input() notification!: Notification;
  @Output() close = new EventEmitter<void>();

  senderImgError = false;

  constructor(private router: Router) {}

  goToTask(): void {
    if (this.notification.projectId) {
      this.router.navigate(['/projects', this.notification.projectId, 'overview']);
    }
  }

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      assigned:  'person_add',
      mentioned: 'alternate_email',
      completed: 'check_circle',
      comment:   'chat_bubble',
      due_soon:  'schedule',
    };
    return map[type] ?? 'notifications';
  }

  // Semantic colors — intentionally fixed
  typeColor(type: string): string {
    const map: Record<string, string> = {
      assigned:  '#6366f1',
      mentioned: '#f59e0b',
      completed: '#10b981',
      comment:   '#3b82f6',
      due_soon:  '#ef4444',
    };
    return map[type] ?? '#94a3b8';
  }

  typeLabel(type: string): string {
    const map: Record<string, string> = {
      assigned:  'Task assigned',
      mentioned: 'Mentioned in comment',
      completed: 'Task completed',
      comment:   'New comment',
      due_soon:  'Due soon',
    };
    return map[type] ?? type;
  }

  avatarColor(id: string): string {
    const palette = ['#6366f1','#10b981','#f59e0b','#3b82f6','#8b5cf6','#f97316','#ec4899','#06b6d4'];
    const idx = Math.abs(id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % palette.length;
    return palette[idx];
  }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
}
