import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-inbox-item',
  templateUrl: './inbox-item.component.html',
  styleUrls: ['./inbox-item.component.scss']
})
export class InboxItemComponent {
  @Input() notification!: Notification;
  @Input() selected = false;

  avatarError = false;

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

  // Semantic colors — intentionally fixed; must be legible in both themes.
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

  // Hash-based color from the same palette used in task-item
  avatarColor(id: string): string {
    const palette = ['#6366f1','#10b981','#f59e0b','#3b82f6','#8b5cf6','#f97316','#ec4899','#06b6d4'];
    const idx = Math.abs(id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % palette.length;
    return palette[idx];
  }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  formatTime(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1)  return 'now';
    if (diffMin < 60) return `${diffMin}m`;
    if (diffHr  < 24) return `${diffHr}h`;
    if (diffDay < 7)  return `${diffDay}d`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
