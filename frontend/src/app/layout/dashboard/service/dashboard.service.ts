import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Task, Project } from 'src/app/core/models/task.model';
import { MOCK_TASKS, MOCK_PROJECTS } from 'src/static-data/taskflow-data';
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



  private tasksSubject = new BehaviorSubject<Task[]>(MOCK_TASKS);
  private projectsSubject = new BehaviorSubject<Project[]>(MOCK_PROJECTS);

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
    return this.httpService.get(ENDPOINTS.GetProjectsByWorkspace);
  }

}
