import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Task, Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild('detailDrawer') detailDrawer!: MatDrawer;

  project: Project | undefined;
  selectedTask: Task | null = null;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectsService.getProject(params['projectId']).subscribe(p => {
        this.project = p;
      });
    });
  }

  openTaskDetail(task: Task): void {
    this.selectedTask = task;
    this.detailDrawer?.open();
  }

  closeDetail(): void {
    this.selectedTask = null;
    this.detailDrawer?.close();
  }
}
