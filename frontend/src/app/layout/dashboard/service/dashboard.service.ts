import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Task, Project } from 'src/app/core/models/task.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ENDPOINTS } from './api.collection';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private httpService: HttpService,
    private userSessionService: UserSessionService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) { }



  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private projectsSubject = new BehaviorSubject<Project[]>([]);

  tasks$ = this.tasksSubject.asObservable();
  projects$ = this.projectsSubject.asObservable();

  get todayTasks$(): Observable<Task[]> {
    const today = new Date();
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t =>
        !t.completed && t.dueDate &&
        new Date(t.dueDate).toDateString() === today.toDateString()
      ))
    );
  }

  get overdueTasks$(): Observable<Task[]> {
    const today = new Date();
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t =>
        !t.completed && t.dueDate && new Date(t.dueDate) < today &&
        new Date(t.dueDate).toDateString() !== today.toDateString()
      ))
    );
  }

  get completedTasks$(): Observable<Task[]> {
    return this.tasks$.pipe(map(tasks => tasks.filter(t => t.completed)));
  }

  completeTask(taskId: string): void {
    const updated = this.tasksSubject.value.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed, status: !t.completed ? 'completed' as const : 'todo' as const } : t
    );
    this.tasksSubject.next(updated);
  }

  public getTeamMembers() {
    return this.httpService.get(ENDPOINTS.ListMembers);
  }
  public GetProjectsByWorkspace() {
    return this.httpService.get(ENDPOINTS.GetProjectsByWorkspace).pipe(
      tap((res: any) => {
        const projects = res.projects.map((project: any) => this.mapProject(project));
        this.projectsSubject.next(projects);
      })
    );
  }

  public createProject(payload: { name: string; description: string; color: string; status: string; dueDate: Date | null }) {
    const data = {
      name: payload.name,
      description: payload.description,
      color: payload.color,
      status: payload.status,
      due_date: payload.dueDate,
      workspace_id: this.userSessionService.userSession?.workspace?.id
    };
    return this.httpService.post(ENDPOINTS.CreateProject, data);
  }

  public loadTasks(): void {
    const userId = this.userSessionService.userSession?.id;
    const params = userId ? { assignee_id: userId } : {};

    this.httpService.get(ENDPOINTS.ListTasks, params).subscribe({
      next: (res: any) => {
        this.tasksSubject.next(res.tasks.map((task: any) => this.mapTask(task)));
      },
      error: (err: any) => console.error('Failed to load dashboard tasks', err),
    });
  }

  public createTask(payload: any) {
    const data = {
      name: payload.name,
      description: payload.description,
      priority: payload.priority,
      due_date: payload.dueDate,
      project_id: payload.projectId,
      assignee_id: payload.assigneeId,
      section_id: 'col_backlog',
    };

    return this.httpService.post(ENDPOINTS.CreateTask, data).pipe(
      tap((res: any) => {
        const task = this.mapTask(res.task);
        this.tasksSubject.next([task, ...this.tasksSubject.value]);
      })
    );
  }

  private mapProject(project: any): Project {
    return {
      ...project,
      id: project.id,
      dueDate: project.due_date ? new Date(project.due_date) : undefined,
      members: project.members || [],
      taskCount: project.taskCount || 0,
      completedTaskCount: project.completedTaskCount || 0,
      createdAt: project.createdAt ? new Date(project.createdAt) : new Date(),
    };
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

}
