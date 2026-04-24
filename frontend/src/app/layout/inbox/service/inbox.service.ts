import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Notification, NotificationType } from 'src/app/core/models/task.model';
import { MOCK_NOTIFICATIONS } from 'src/static-data/taskflow-data';

export type InboxFilter = 'all' | 'assigned' | 'mentioned' | 'completed' | 'comment' | 'due_soon';

@Injectable({ providedIn: 'root' })
export class InboxService {
  private notificationsSubject = new BehaviorSubject<Notification[]>(MOCK_NOTIFICATIONS);
  notifications$ = this.notificationsSubject.asObservable();

  getUnreadCount(): Observable<number> {
    return this.notifications$.pipe(map(ns => ns.filter(n => !n.read).length));
  }

  getFiltered(filter: InboxFilter): Observable<Notification[]> {
    return this.notifications$.pipe(
      map(ns => filter === 'all' ? ns : ns.filter(n => n.type === (filter as NotificationType)))
    );
  }

  markRead(id: string): void {
    const updated = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(updated);
  }

  markAllRead(): void {
    const updated = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(updated);
  }
}
