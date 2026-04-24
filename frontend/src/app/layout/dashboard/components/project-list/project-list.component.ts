import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];

  constructor(private router: Router) {}

  goToProject(project: Project): void {
    this.router.navigate(['/projects', project.id, 'list']);
  }

  progressPercent(project: Project): number {
    if (!project.taskCount) return 0;
    return Math.round((project.completedTaskCount / project.taskCount) * 100);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      on_track: 'On Track', at_risk: 'At Risk', off_track: 'Off Track'
    };
    return map[status] ?? status;
  }

  statusColor(status: string): string {
    const map: Record<string, string> = {
      on_track: '#10b981', at_risk: '#f59e0b', off_track: '#ef4444'
    };
    return map[status] ?? '#94a3b8';
  }
}
