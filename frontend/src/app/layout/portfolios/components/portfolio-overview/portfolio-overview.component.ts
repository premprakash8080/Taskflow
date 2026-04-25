import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Portfolio, Project } from 'src/app/core/models/task.model';
import { PortfoliosService } from '../../service/portfolios.service';

@Component({
  selector: 'vex-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioOverviewComponent implements OnInit, OnDestroy {
  portfolio: Portfolio | undefined;
  projects: Project[] = [];

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private portfoliosService: PortfoliosService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.parent!.params.pipe(
        switchMap(params => combineLatest([
          this.portfoliosService.getPortfolio(params['portfolioId']),
          this.portfoliosService.getProjectsForPortfolio(params['portfolioId']),
        ]))
      ).subscribe(([portfolio, projects]) => {
        this.portfolio = portfolio;
        this.projects = projects;
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Computed summary ────────────────────────────────────────────────────────

  get onTrackCount(): number  { return this.projects.filter(p => p.status === 'on_track').length; }
  get atRiskCount(): number   { return this.projects.filter(p => p.status === 'at_risk').length; }
  get offTrackCount(): number { return this.projects.filter(p => p.status === 'off_track').length; }

  get overallProgress(): number {
    const total = this.projects.reduce((s, p) => s + p.taskCount, 0);
    const done  = this.projects.reduce((s, p) => s + p.completedTaskCount, 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  progressPct(project: Project): number {
    return project.taskCount > 0
      ? Math.round((project.completedTaskCount / project.taskCount) * 100)
      : 0;
  }

  // ── Display helpers ─────────────────────────────────────────────────────────

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

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
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
