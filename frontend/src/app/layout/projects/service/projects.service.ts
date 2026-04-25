import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Project, Task, BoardColumn } from 'src/app/core/models/task.model';
import { MOCK_PROJECTS, MOCK_TASKS, MOCK_BOARD_COLUMNS } from 'src/static-data/taskflow-data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>(MOCK_PROJECTS);
  private columnsSubject  = new BehaviorSubject<BoardColumn[]>(MOCK_BOARD_COLUMNS);
  private tasksSubject    = new BehaviorSubject<Task[]>(MOCK_TASKS);

  // Shared selected-task state — child views write here; parent drawer reads it.
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);

  // Signal from the header "Add task" button to whichever view is active.
  private addTaskRequestSubject = new Subject<void>();

  projects$        = this.projectsSubject.asObservable();
  columns$         = this.columnsSubject.asObservable();
  selectedTask$    = this.selectedTaskSubject.asObservable();
  addTaskRequest$  = this.addTaskRequestSubject.asObservable();

  /** Called by the project header "Add task" button. */
  requestAddTask(): void {
    this.addTaskRequestSubject.next();
  }

  getProject(id: string): Observable<Project | undefined> {
    return this.projects$.pipe(map(ps => ps.find(p => p.id === id)));
  }

  getTasksForProject(projectId: string): Observable<Task[]> {
    return this.tasksSubject.pipe(
      map(tasks => tasks.filter(t => t.projectId === projectId))
    );
  }

  getColumnsForProject(_projectId: string): Observable<BoardColumn[]> {
    return this.columns$;
  }

  /** Called by any child view when the user clicks a task row / card. */
  selectTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  /** Update a task (e.g. after editing in the detail panel). */
  updateTask(updated: Task): void {
    const tasks = this.tasksSubject.value.map(t => t.id === updated.id ? updated : t);
    this.tasksSubject.next(tasks);
    // Keep selected task in sync
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
    // Keep tasksSubject in sync so list/overview/timeline stay consistent
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
    // Keep columnsSubject in sync so board view sees new tasks immediately
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
