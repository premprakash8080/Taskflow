import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-projects-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private projectsService: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    // Auto-navigate to first project when landing on /projects root
    this.projectsService.projects$.subscribe(projects => {
      const isAtRoot = /^\/projects\/?$/.test(this.router.url);
      if (projects.length && isAtRoot) {
        this.router.navigate(['/projects', projects[0].id, 'overview']);
      }
    });
  }
}
