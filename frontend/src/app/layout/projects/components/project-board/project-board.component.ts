import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn, Task } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  columns: BoardColumn[] = [];
  projectId = '';

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectsService.getColumnsForProject(this.projectId).subscribe(cols => {
        this.columns = cols;
      });
    });
  }

  get columnIds(): string[] {
    return this.columns.map(c => c.id);
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
