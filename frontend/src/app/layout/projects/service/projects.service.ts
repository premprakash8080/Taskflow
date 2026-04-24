import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project, Task, BoardColumn } from 'src/app/core/models/task.model';
import { MOCK_PROJECTS, MOCK_TASKS, MOCK_BOARD_COLUMNS } from 'src/static-data/taskflow-data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>(MOCK_PROJECTS);
  private columnsSubject = new BehaviorSubject<BoardColumn[]>(MOCK_BOARD_COLUMNS);

  projects$ = this.projectsSubject.asObservable();
  columns$ = this.columnsSubject.asObservable();

  getProject(id: string): Observable<Project | undefined> {
    return this.projects$.pipe(map(ps => ps.find(p => p.id === id)));
  }

  getTasksForProject(projectId: string): Observable<Task[]> {
    return new BehaviorSubject<Task[]>(MOCK_TASKS.filter(t => t.projectId === projectId)).asObservable();
  }

  getColumnsForProject(_projectId: string): Observable<BoardColumn[]> {
    return this.columns$;
  }

  moveTask(previousColId: string, currentColId: string, previousIndex: number, currentIndex: number): void {
    const cols = this.columnsSubject.value.map(c => ({ ...c, tasks: [...c.tasks] }));
    const prevCol = cols.find(c => c.id === previousColId)!;
    const currCol = cols.find(c => c.id === currentColId)!;
    const [task] = prevCol.tasks.splice(previousIndex, 1);
    currCol.tasks.splice(currentIndex, 0, { ...task, sectionId: currentColId });
    this.columnsSubject.next(cols);
  }

  reorderTask(colId: string, previousIndex: number, currentIndex: number): void {
    const cols = this.columnsSubject.value.map(c => ({ ...c, tasks: [...c.tasks] }));
    const col = cols.find(c => c.id === colId)!;
    const [task] = col.tasks.splice(previousIndex, 1);
    col.tasks.splice(currentIndex, 0, task);
    this.columnsSubject.next(cols);
  }
}
