import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Task, TaskFilter, TaskSection } from 'src/app/core/models/task.model';
import { MOCK_TASKS } from 'src/static-data/taskflow-data';

const today = new Date();

@Injectable({ providedIn: 'root' })
export class MyTasksService {
  private tasksSubject = new BehaviorSubject<Task[]>(MOCK_TASKS);
  tasks$ = this.tasksSubject.asObservable();

  getSections(filter: TaskFilter): Observable<TaskSection[]> {
    return this.tasks$.pipe(
      map(tasks => {
        const filtered = this.applyFilter(tasks, filter);
        return [
          {
            id: 'recently_assigned', label: 'Recently Assigned', expanded: true,
            tasks: filtered.filter(t => t.sectionId === 'recently_assigned'),
          },
          {
            id: 'today', label: 'Today', expanded: true,
            tasks: filtered.filter(t => t.sectionId === 'today'),
          },
          {
            id: 'upcoming', label: 'Upcoming', expanded: true,
            tasks: filtered.filter(t => t.sectionId === 'upcoming'),
          },
        ];
      })
    );
  }

  updateTask(updated: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === updated.id ? updated : t);
    this.tasksSubject.next(tasks);
  }

  toggleComplete(taskId: string): void {
    const tasks = this.tasksSubject.value.map(t =>
      t.id === taskId
        ? { ...t, completed: !t.completed, status: !t.completed ? 'completed' as const : 'todo' as const }
        : t
    );
    this.tasksSubject.next(tasks);
  }

  private applyFilter(tasks: Task[], filter: TaskFilter): Task[] {
    switch (filter) {
      case 'incomplete': return tasks.filter(t => !t.completed);
      case 'completed':  return tasks.filter(t => t.completed);
      case 'today':      return tasks.filter(t =>
        t.dueDate && new Date(t.dueDate).toDateString() === today.toDateString()
      );
      default:           return tasks;
    }
  }
}
