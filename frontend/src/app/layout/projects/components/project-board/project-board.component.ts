import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { BoardColumn, Task } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  columns: BoardColumn[] = [];
  projectId = '';

  // Inline add-task state (per column)
  addingColId: string | null = null;
  newTaskName = '';

  private subs = new Subscription();

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => {
          this.projectId = params['projectId'];
          this.addingColId = null;
          this.newTaskName = '';
          return this.projectsService.getColumnsForProject(this.projectId);
        })
      ).subscribe(cols => {
        this.columns = cols;
      })
    );

    // "Add task" button in the project header → open input on first column
    this.subs.add(
      this.projectsService.addTaskRequest$.subscribe(() => {
        const first = this.columns[0];
        if (first) this.startAddTask(first.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  startAddTask(colId: string, event?: MouseEvent): void {
    event?.stopPropagation();
    this.addingColId = colId;
    this.newTaskName = '';
  }

  commitAddTask(): void {
    const name = this.newTaskName.trim();
    const colId = this.addingColId;
    // Reset FIRST — service call is synchronous
    this.addingColId = null;
    this.newTaskName = '';
    if (name && colId) {
      this.projectsService.addTask(this.projectId, name, colId);
    }
  }

  cancelAddTask(): void {
    this.addingColId = null;
    this.newTaskName = '';
  }

  onAddKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') { event.preventDefault(); this.commitAddTask(); }
    else if (event.key === 'Escape') { this.cancelAddTask(); }
  }

  get columnIds(): string[] {
    return this.columns.map(c => c.id);
  }

  selectTask(task: Task): void {
    this.projectsService.selectTask(task);
  }

  onDrop(event: CdkDragDrop<Task[]>, targetColumn: BoardColumn): void {
    if (event.previousContainer === event.container) {
      this.projectsService.reorderTask(targetColumn.id, event.previousIndex, event.currentIndex);
      moveItemInArray(targetColumn.tasks, event.previousIndex, event.currentIndex);
    } else {
      const sourceColumn = this.columns.find(c => c.tasks === event.previousContainer.data)!;
      this.projectsService.moveTask(sourceColumn.id, targetColumn.id, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  priorityColor(p: string): string {
    const map: Record<string, string> = {
      high: '#ef4444', medium: '#f59e0b', low: '#10b981', none: '#e2e8f0'
    };
    return map[p] ?? '#e2e8f0';
  }
}
