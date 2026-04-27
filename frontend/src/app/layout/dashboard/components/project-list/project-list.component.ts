import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/models/task.model';
import { DashboardService } from '../../service/dashboard.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'vex-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private userSessionService: UserSessionService,
  ) { }

  ngOnInit(): void {
    const session = this.userSessionService.userSession;


    this.GetProjectsByWorkspace();
  }

  goToProject(project: Project): void {
    this.router.navigate(['/projects', project.id, 'overview']);
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


  GetProjectsByWorkspace(): void {
    this.dashboardService.GetProjectsByWorkspace().subscribe({
      next: (res: any) => {

        console.log("res projects", res)
      },
      error: (err: any) => {
        console.error('Failed to load team members', err);
      }
    });
  }

}
