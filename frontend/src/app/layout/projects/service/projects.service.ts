import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Project, Task, BoardColumn } from 'src/app/core/models/task.model';
import { MOCK_BOARD_COLUMNS, MOCK_TASKS } from 'src/static-data/taskflow-data';
import { HttpService } from 'src/app/shared/services/http.service';
import { ENDPOINTS } from './api.collection';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);  // ⬅️ Empty — API se aayega
  private columnsSubject  = new BehaviorSubject<BoardColumn[]>(MOCK_BOARD_COLUMNS);
  private tasksSubject    = new BehaviorSubject<Task[]>(MOCK_TASKS);
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  private addTaskRequestSubject = new Subject<void>();

  projects$        = this.projectsSubject.asObservable();
  columns$         = this.columnsSubject.asObservable();
  selectedTask$    = this.selectedTaskSubject.asObservable();
  addTaskRequest$  = this.addTaskRequestSubject.asObservable();

  constructor(private httpService: HttpService) {  // ⬅️ Add
    // this.loadProjects();  // ⬅️ App start hote hi projects load karo
  }

  // ⬅️ API se projects load karo
  // loadProjects(workspaceId?: number): void {
  //   const params = workspaceId ? { workspace_id: workspaceId } : {};
  //   this.httpService.get(ENDPOINTS.ListProjects, params).subscribe({
  //     next: (res: any) => {
  //       this.projectsSubject.next(res.projects);
  //     },
  //     error: (err: any) => {
  //       console.error('Failed to load projects', err);
  //     }
  //   });
  // }

  // ⬅️ API se project create karo
  createProject(data: any): Observable<any> {
    return this.httpService.post(ENDPOINTS.CreateProject, data).pipe(
      tap((res: any) => {
        // Naya project list mein add karo
        const current = this.projectsSubject.value;
        this.projectsSubject.next([res.project, ...current]);
      })
    );
  }

  // ⬅️ API se project delete karo
  deleteProject(projectId: number): Observable<any> {
    return this.httpService.delete(ENDPOINTS.DeleteProject(projectId)).pipe(
      tap(() => {
        const current = this.projectsSubject.value.filter((p: any) => p.id !== projectId);
        this.projectsSubject.next(current);
      })
    );
  }

  // ⬅️ API se project members lo
  getProjectMembers(projectId: number): Observable<any> {
    return this.httpService.get(ENDPOINTS.GetProjectMembers(projectId));
  }

  // ⬅️ API se project metrics lo
  getProjectMetrics(projectId: number): Observable<any> {
    return this.httpService.get(ENDPOINTS.GetProjectMetrics(projectId));
  }

  requestAddTask(): void {
    this.addTaskRequestSubject.next();
  }

  getProject(id: string): Observable<Project | undefined> {
    return this.projects$.pipe(map(ps => ps.find((p: any) => p.id === +id)));
  }

  getTasksForProject(projectId: string): Observable<Task[]> {
    return this.tasksSubject.pipe(
      map(tasks => tasks.filter(t => t.projectId === projectId))
    );
  }

  getColumnsForProject(_projectId: string): Observable<BoardColumn[]> {
    return this.columns$;
  }

  selectTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  updateTask(updated: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === updated.id ? updated : t);
    this.tasksSubject.next(tasks);
    if (this.selectedTaskSubject.value?.id === updated.id) {
      this.selectedTaskSubject.next(updated);
    }
  }

  toggleComplete(taskId: string): void {
    const tasks = this.tasksSubject.value.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(tasks);
  }

  moveTask(previousColId: string, currentColId: string, previousIndex: number, currentIndex: number): void {
    const cols = this.columnsSubject.value.map(c => ({ ...c, tasks: [...c.tasks] }));
    const prevCol = cols.find(c => c.id === previousColId)!;
    const currCol = cols.find(c => c.id === currentColId)!;
    const [task] = prevCol.tasks.splice(previousIndex, 1);
    const movedTask = { ...task, sectionId: currentColId };
    currCol.tasks.splice(currentIndex, 0, movedTask);
    this.columnsSubject.next(cols);
    this.tasksSubject.next(
      this.tasksSubject.value.map(t => t.id === movedTask.id ? movedTask : t)
    );
  }

  addTask(projectId: string, name: string, sectionId: string): void {
    const now = new Date();
    const newTask: Task = {
      id: 'task_' + Date.now(),
      name,
      completed: false,
      status: 'todo',
      priority: 'none',
      projectId,
      sectionId,
      subtasks: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
    };
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
    const cols = this.columnsSubject.value.map(c =>
      c.id === sectionId ? { ...c, tasks: [...c.tasks, newTask] } : c
    );
    this.columnsSubject.next(cols);
  }

  reorderTask(colId: string, previousIndex: number, currentIndex: number): void {
    const cols = this.columnsSubject.value.map(c => ({ ...c, tasks: [...c.tasks] }));
    const col = cols.find(c => c.id === colId)!;
    const [task] = col.tasks.splice(previousIndex, 1);
    col.tasks.splice(currentIndex, 0, task);
    this.columnsSubject.next(cols);
  }

  updateProject(updated: Project): void {
    const projects = this.projectsSubject.value.map(p => p.id === updated.id ? updated : p);
    this.projectsSubject.next(projects);
  }

  removeProjectMember(projectId: string, memberId: string): void {
    const projects = this.projectsSubject.value.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, members: p.members.filter(m => m.id !== memberId) };
    });
    this.projectsSubject.next(projects);
  }
}