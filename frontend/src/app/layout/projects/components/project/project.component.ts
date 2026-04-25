import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [
    trigger('slidePanel', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('220ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('180ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: Project | undefined;
  selectedTask: Task | null = null;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.projectsService.getProject(params['projectId']).subscribe(p => {
          this.project = p;
        });
        this.projectsService.selectTask(null);
      })
    );

    this.subs.add(
      this.projectsService.selectedTask$.subscribe(task => {
        this.selectedTask = task;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closeDetail(): void {
    this.projectsService.selectTask(null);
  }

  onTaskUpdate(task: Task): void {
    this.projectsService.updateTask(task);
  }

  onToggleComplete(taskId: string): void {
    this.projectsService.toggleComplete(taskId);
  }
}
