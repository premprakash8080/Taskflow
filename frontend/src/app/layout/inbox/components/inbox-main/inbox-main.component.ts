import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/core/models/task.model';
import { InboxService, InboxFilter } from '../../service/inbox.service';

@Component({
  selector: 'vex-inbox-main',
  templateUrl: './inbox-main.component.html',
  styleUrls: ['./inbox-main.component.scss']
})
export class InboxMainComponent implements OnInit {
  notifications: Notification[] = [];
  selected: Notification | null = null;
  activeFilter: InboxFilter = 'all';
  unreadCount = 0;

  breadcrumbs = [{ label: 'Inbox' }];

  constructor(private inboxService: InboxService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.inboxService.getUnreadCount().subscribe(c => this.unreadCount = c);
  }

  loadNotifications(): void {
    this.inboxService.getFiltered(this.activeFilter).subscribe(ns => {
      this.notifications = ns;
    });
  }

  onFilterChange(filter: InboxFilter): void {
    this.activeFilter = filter;
    this.selected = null;
    this.loadNotifications();
  }

  selectNotification(n: Notification): void {
    this.selected = n;
    if (!n.read) this.inboxService.markRead(n.id);
  }

  markAllRead(): void {
    this.inboxService.markAllRead();
  }
}
