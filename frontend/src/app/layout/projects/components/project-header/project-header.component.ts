import { Component, Input } from '@angular/core';
import { Project } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent {
  @Input() project!: Project;

  views = [
    { path: 'list',     label: 'List',     icon: 'format_list_bulleted' },
    { path: 'board',    label: 'Board',    icon: 'view_kanban' },
    { path: 'timeline', label: 'Timeline', icon: 'timeline' },
    { path: 'members',  label: 'Members',  icon: 'group' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
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
