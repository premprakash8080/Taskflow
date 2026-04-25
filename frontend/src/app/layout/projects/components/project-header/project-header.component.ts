import { Component, Input } from '@angular/core';
import { Project } from 'src/app/core/models/task.model';
import { ProjectsService } from '../../service/projects.service';

@Component({
  selector: 'vex-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent {
  @Input() project!: Project;

  constructor(private projectsService: ProjectsService) {}

  addTask(): void {
    this.projectsService.requestAddTask();
  }

  views = [
    { path: 'overview',  label: 'Overview',  icon: 'mat:home' },
    { path: 'list',      label: 'List',      icon: 'mat:view_list' },
    { path: 'board',     label: 'Board',     icon: 'mat:view_column' },
    { path: 'timeline',  label: 'Timeline',  icon: 'mat:timeline' },
    { path: 'calendar',  label: 'Calendar',  icon: 'mat:calendar_month' },
    { path: 'files',     label: 'Files',     icon: 'mat:attach_file' },
    { path: 'members',   label: 'Members',   icon: 'mat:group' },
    { path: 'settings',  label: 'Settings',  icon: 'mat:settings' },
  ];

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
