import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Notification } from 'src/app/core/models/task.model';
import { InboxService, InboxFilter } from '../../service/inbox.service';

export interface NotificationGroup {
  label: string;
  items: Notification[];
}

@Component({
  selector: 'vex-inbox-main',
  templateUrl: './inbox-main.component.html',
  styleUrls: ['./inbox-main.component.scss']
})
export class InboxMainComponent implements OnInit {
  @ViewChild('detailDrawer') detailDrawer!: MatDrawer;

  notifications: Notification[] = [];
  selected: Notification | null = null;
  activeFilter: InboxFilter = 'all';
  unreadCount = 0;

  readonly tabs: { value: InboxFilter; label: string }[] = [
    { value: 'all',       label: 'Activity' },
    { value: 'assigned',  label: 'Assigned' },
    { value: 'mentioned', label: '@Mentions' },
    { value: 'comment',   label: 'Comments' },
    { value: 'due_soon',  label: 'Due Soon' },
  ];

  constructor(private inboxService: InboxService) {}

  ngOnInit(): void {
    this.inboxService.notifications$.subscribe(ns => {
      this.unreadCount = ns.filter(n => !n.read).length;
    });
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.inboxService.getFiltered(this.activeFilter).subscribe(ns => {
      this.notifications = ns;
    });
  }

  setTab(filter: InboxFilter): void {
    this.activeFilter = filter;
    this.selected = null;
    this.detailDrawer?.close();
    this.loadNotifications();
  }

  selectItem(n: Notification): void {
    this.selected = n;
    if (!n.read) this.inboxService.markRead(n.id);
    this.detailDrawer.open();
  }

  /** Called when the drawer finishes closing (backdrop click or close button). */
  onDrawerClosed(): void {
    this.selected = null;
  }

  markAllRead(): void {
    this.inboxService.markAllRead();
  }

  get groupedNotifications(): NotificationGroup[] {
    const now = new Date();
    const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    const todayItems     = this.notifications.filter(n => new Date(n.createdAt) >= todayStart);
    const yesterdayItems = this.notifications.filter(n => {
      const d = new Date(n.createdAt);
      return d >= yesterdayStart && d < todayStart;
    });
    const earlierItems   = this.notifications.filter(n => new Date(n.createdAt) < yesterdayStart);

    const groups: NotificationGroup[] = [];
    if (todayItems.length)     groups.push({ label: 'Today',     items: todayItems });
    if (yesterdayItems.length) groups.push({ label: 'Yesterday', items: yesterdayItems });
    if (earlierItems.length)   groups.push({ label: 'Earlier',   items: earlierItems });
    return groups;
  }
}
