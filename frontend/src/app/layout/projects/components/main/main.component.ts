import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-projects-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    this.projectsService.projects$.subscribe(p => {
      this.projects = p;
      if (p.length && !this.router.url.includes('/projects/')) {
        this.router.navigate(['/projects', p[0].id, 'list']);
      }
    });
  }

  selectProject(project: Project): void {
    this.router.navigate(['/projects', project.id, 'list']);
  }

  isActive(projectId: string): boolean {
    return this.router.url.includes(`/projects/${projectId}`);
  }

  statusColor(status: string): string {
    const map: Record<string, string> = {
      on_track: '#10b981',
      at_risk: '#f59e0b',
      off_track: '#ef4444',
    };
    return map[status] ?? '#94a3b8';
  }
}
