import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Portfolio, Project } from 'src/app/core/models/task.model';
import { PortfoliosService } from '../../service/portfolios.service';
import { MOCK_PROJECTS } from 'src/static-data/taskflow-data';

@Component({
  selector: 'vex-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  styleUrls: ['./portfolios-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosListComponent {
  portfolios$ = this.portfoliosService.portfolios$;

  constructor(
    private portfoliosService: PortfoliosService,
    private router: Router,
  ) {}

  openPortfolio(portfolio: Portfolio): void {
    this.router.navigate(['/portfolios', portfolio.id, 'overview']);
  }

  projectsFor(portfolio: Portfolio): Project[] {
    return MOCK_PROJECTS.filter(p => portfolio.projectIds.includes(p.id));
  }

  onTrackCount(portfolio: Portfolio): number {
    return this.projectsFor(portfolio).filter(p => p.status === 'on_track').length;
  }

  atRiskCount(portfolio: Portfolio): number {
    return this.projectsFor(portfolio).filter(p => p.status === 'at_risk').length;
  }

  offTrackCount(portfolio: Portfolio): number {
    return this.projectsFor(portfolio).filter(p => p.status === 'off_track').length;
  }

  overallProgress(portfolio: Portfolio): number {
    const projects = this.projectsFor(portfolio);
    const total = projects.reduce((s, p) => s + p.taskCount, 0);
    const done  = projects.reduce((s, p) => s + p.completedTaskCount, 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  avatarInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  avatarColor(id: string): string {
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];
    let n = 0;
    for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
    return colors[n % colors.length];
  }
}
