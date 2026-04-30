import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Task, TaskFilter, TaskSection } from 'src/app/core/models/task.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { environment } from 'src/environments/environment';

const today = new Date();
const TASKS_ENDPOINT = `${environment.apiBaseUrl}/api/tasks`;

@Injectable({ providedIn: 'root' })
export class MyTasksService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private loaded = false;
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private httpService: HttpService,
    private userSessionService: UserSessionService,
  ) {}

  getSections(filter: TaskFilter): Observable<TaskSection[]> {
    this.loadMyTasks();

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
    this.patchLocalTask(updated);
    this.httpService.put(`${TASKS_ENDPOINT}/${updated.id}`, this.toTaskPayload(updated)).subscribe({
      next: (res: any) => this.patchLocalTask(this.mapTask(res.task)),
      error: (err: any) => console.error('Failed to update task', err),
    });
  }

  toggleComplete(taskId: string): void {
    const task = this.tasksSubject.value.find(t => t.id === taskId);
    if (!task) return;

    this.updateTask({
      ...task,
      completed: !task.completed,
      status: !task.completed ? 'completed' as const : 'todo' as const,
    });
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

  private loadMyTasks(): void {
    if (this.loaded) return;
    this.loaded = true;

    const userId = this.userSessionService.userSession?.id;
    const params = userId ? { assignee_id: userId } : {};

    this.httpService.get(TASKS_ENDPOINT, params).subscribe({
      next: (res: any) => {
        this.tasksSubject.next(res.tasks.map((task: any) => this.mapTask(task)));
      },
      error: (err: any) => {
        this.loaded = false;
        console.error('Failed to load my tasks', err);
      },
    });
  }

  private patchLocalTask(updated: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === updated.id ? updated : t);
    this.tasksSubject.next(tasks);
  }

  private mapTask(task: any): Task {
    return {
      id: String(task.id),
      name: task.name,
      description: task.description || '',
      completed: !!task.completed,
      status: task.status || (task.completed ? 'completed' : 'todo'),
      priority: task.priority || 'none',
      dueDate: task.due_date ? new Date(task.due_date) : undefined,
      assignee: task.assignee ? {
        id: String(task.assignee.id),
        name: task.assignee.name,
        imgUrl: task.assignee.avatar_url || '',
      } : undefined,
      projectId: String(task.project_id),
      projectName: task.Project?.name,
      sectionId: task.section_id || 'today',
      subtasks: task.subtasks || [],
      comments: task.comments || [],
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date(),
    };
  }

  private toTaskPayload(task: Task): any {
    return {
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.dueDate,
      completed: task.completed,
      section_id: task.sectionId,
      project_id: task.projectId ? Number(task.projectId) : undefined,
      assignee_id: task.assignee?.id ? Number(task.assignee.id) : null,
      subtasks: task.subtasks || [],
      comments: task.comments || [],
    };
  }
}
