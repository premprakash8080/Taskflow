import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Project, Task, BoardColumn } from 'src/app/core/models/task.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { ENDPOINTS } from './api.collection';

const DEFAULT_BOARD_COLUMNS: BoardColumn[] = [
  { id: 'col_backlog', name: 'Backlog', color: '#94a3b8', tasks: [] },
  { id: 'col_inprogress', name: 'In Progress', color: '#6366f1', tasks: [] },
  { id: 'col_review', name: 'In Review', color: '#f59e0b', tasks: [] },
  { id: 'col_done', name: 'Done', color: '#10b981', tasks: [] },
];

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private tasksSubject    = new BehaviorSubject<Task[]>([]);
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  private addTaskRequestSubject = new Subject<void>();
  private loadedProjectIds = new Set<string>();

  projects$        = this.projectsSubject.asObservable();
  selectedTask$    = this.selectedTaskSubject.asObservable();
  addTaskRequest$  = this.addTaskRequestSubject.asObservable();

  constructor(private httpService: HttpService) {
    this.loadProjects();
  }

  loadProjects(workspaceId?: number): void {
    const params = workspaceId ? { workspace_id: workspaceId } : {};
    this.httpService.get(ENDPOINTS.ListProjects, params).subscribe({
      next: (res: any) => {
        const projects = res.projects.map((p: any)=>({
          ...p,
          id: p.id,
          dueDate: p.due_date ? new Date(p.due_date): undefined,
          members: p.members || [],
          taskCount : p.taskCount || 0,
          completedTaskCount: p.completedTaskCount || 0,
        }))
        this.projectsSubject.next(projects);
      },
      error: (err: any) => {
        console.error('Failed to load projects', err);
      }
    });
  }

  createProject(data: any): Observable<any> {
    const payload = {
      ...data,
      due_date: data.due_date ?? data.dueDate,
    };
    delete payload.dueDate;

    return this.httpService.post(ENDPOINTS.CreateProject, payload).pipe(
      tap((res: any) => {
        const current = this.projectsSubject.value;
        const project = {
          ...res.project,
          dueDate: res.project?.due_date ? new Date(res.project.due_date) : undefined,
          members: res.project?.members || [],
          taskCount: res.project?.taskCount || 0,
          completedTaskCount: res.project?.completedTaskCount || 0,
        };
        this.projectsSubject.next([project, ...current]);
      })
    );
  }

  deleteProject(projectId: number): Observable<any> {
    return this.httpService.delete(ENDPOINTS.DeleteProject(projectId)).pipe(
      tap(() => {
        const current = this.projectsSubject.value.filter((p: any) => p.id !== projectId);
        this.projectsSubject.next(current);
      })
    );
  }

  getProjectMembers(projectId: number): Observable<any> {
    return this.httpService.get(ENDPOINTS.GetProjectMembers(projectId));
  }

  addProjectMember(projectId: string | number, email: string): Observable<any> {
    return this.httpService.post(ENDPOINTS.AddProjectMember(Number(projectId)), { email });
  }

  deleteProjectMember(projectId: string | number, memberId: string | number): Observable<any> {
    return this.httpService.delete(ENDPOINTS.RemoveProjectMember(Number(projectId), Number(memberId)));
  }

  getProjectMetrics(projectId: number): Observable<any> {
    return this.httpService.get(ENDPOINTS.GetProjectMetrics(projectId));
  }

  requestAddTask(): void {
    this.addTaskRequestSubject.next();
  }

  getProject(id: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map(ps => ps.find((p: any) => p.id === +id)));
  }

  getProjectById(projectId: number): Observable<any> {
  return this.httpService.get(ENDPOINTS.GetProject(projectId));
}

  getTasksForProject(projectId: string): Observable<Task[]> {
    this.loadTasksForProject(projectId);
    return this.tasksSubject.pipe(
      map(tasks => tasks.filter(t => t.projectId === projectId))
    );
  }

  getColumnsForProject(projectId: string): Observable<BoardColumn[]> {
    this.loadTasksForProject(projectId);
    return this.tasksSubject.pipe(
      map(tasks => {
        const projectTasks = tasks.filter(t => t.projectId === projectId);
        return DEFAULT_BOARD_COLUMNS.map(column => ({
          ...column,
          tasks: projectTasks.filter(task => task.sectionId === column.id),
        }));
      })
    );
  }

  selectTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  updateTask(updated: Task): void {
    this.patchLocalTask(updated);
    this.httpService.put(ENDPOINTS.UpdateTask(updated.id), this.toTaskPayload(updated)).subscribe({
      next: (res: any) => this.patchLocalTask(this.mapTask(res.task)),
      error: (err: any) => console.error('Failed to update task', err),
    });
  }

  toggleComplete(taskId: string): void {
    const current = this.tasksSubject.value.find(t => t.id === taskId);
    if (!current) return;
    const updated = {
      ...current,
      completed: !current.completed,
      status: !current.completed ? 'completed' as const : 'todo' as const,
    };
    this.updateTask(updated);
  }

  moveTask(previousColId: string, currentColId: string, previousIndex: number, currentIndex: number): void {
    const projectId = this.tasksSubject.value.find(t => t.sectionId === previousColId)?.projectId;
    const projectTasks = projectId ? this.tasksSubject.value.filter(t => t.projectId === projectId) : this.tasksSubject.value;
    const prevTasks = projectTasks.filter(t => t.sectionId === previousColId);
    const moved = prevTasks[previousIndex];
    if (!moved) return;

    const updated = { ...moved, sectionId: currentColId, status: this.statusForSection(currentColId) };
    const tasks = this.tasksSubject.value.map(t =>
      t.id === moved.id ? updated : t
    );
    this.tasksSubject.next(tasks);
    this.httpService.put(ENDPOINTS.UpdateTask(updated.id), this.toTaskPayload(updated)).subscribe({
      next: (res: any) => this.patchLocalTask(this.mapTask(res.task)),
      error: (err: any) => console.error('Failed to move task', err),
    });
  }

  addTask(projectId: string, name: string, sectionId: string): void {
    const payload = {
      name,
      project_id: Number(projectId),
      section_id: sectionId,
      status: this.statusForSection(sectionId),
      priority: 'none',
    };

    this.httpService.post(ENDPOINTS.CreateTask, payload).subscribe({
      next: (res: any) => {
        const task = this.mapTask(res.task);
        this.tasksSubject.next([...this.tasksSubject.value, task]);
      },
      error: (err: any) => console.error('Failed to create task', err),
    });
  }

  reorderTask(colId: string, previousIndex: number, currentIndex: number): void {
    const columnTasks = this.tasksSubject.value.filter(t => t.sectionId === colId);
    const task = columnTasks[previousIndex];
    if (!task) return;
    this.httpService.put(ENDPOINTS.UpdateTask(task.id), { order_index: currentIndex }).subscribe({
      error: (err: any) => console.error('Failed to reorder task', err),
    });
  }

  updateProject(updated: Project): void {
    const projects = this.projectsSubject.value.map(p => p.id === updated.id ? updated : p);
    this.projectsSubject.next(projects);
  }

  removeProjectMember(projectId: string, memberId: string): void {
    this.deleteProjectMember(projectId, memberId).subscribe({
      error: (err: any) => console.error('Failed to remove project member', err),
    });

    const projects = this.projectsSubject.value.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, members: p.members.filter(m => m.id !== memberId) };
    });
    this.projectsSubject.next(projects);
  }

  private loadTasksForProject(projectId: string): void {
    if (this.loadedProjectIds.has(projectId)) return;
    this.loadedProjectIds.add(projectId);

    this.httpService.get(ENDPOINTS.ListTasks, { project_id: projectId }).subscribe({
      next: (res: any) => {
        const incoming = res.tasks.map((task: any) => this.mapTask(task));
        const others = this.tasksSubject.value.filter(task => task.projectId !== projectId);
        this.tasksSubject.next([...others, ...incoming]);
      },
      error: (err: any) => {
        this.loadedProjectIds.delete(projectId);
        console.error('Failed to load tasks', err);
      },
    });
  }

  private patchLocalTask(updated: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === updated.id ? updated : t);
    this.tasksSubject.next(tasks);
    if (this.selectedTaskSubject.value?.id === updated.id) {
      this.selectedTaskSubject.next(updated);
    }
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
      sectionId: task.section_id || 'col_backlog',
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

  private statusForSection(sectionId: string): 'todo' | 'in_progress' | 'completed' {
    if (sectionId === 'col_inprogress' || sectionId === 'col_review') return 'in_progress';
    if (sectionId === 'col_done') return 'completed';
    return 'todo';
  }
}
