import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Portfolio, Project, TaskAssignee } from 'src/app/core/models/task.model';
import { PortfoliosService } from '../../service/portfolios.service';

export interface PortfolioMessage {
  id: string;
  author: TaskAssignee;
  project: Project;
  status: string;
  body: string;
  createdAt: Date;
}

@Component({
  selector: 'vex-portfolio-messages',
  templateUrl: './portfolio-messages.component.html',
  styleUrls: ['./portfolio-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioMessagesComponent implements OnInit, OnDestroy {
  portfolio: Portfolio | undefined;
  projects: Project[] = [];
  messages: PortfolioMessage[] = [];
  newBody = '';

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
        const projectChanged = !this.portfolio || this.portfolio.id !== portfolio?.id;
        this.portfolio = portfolio;
        this.projects = projects;
        if (projectChanged) this.seedMessages(projects);
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private seedMessages(projects: Project[]): void {
    const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);
    const author1: TaskAssignee = { id: 'u1', name: 'David Smith',   imgUrl: 'assets/img/demo/1.jpg' };
    const author2: TaskAssignee = { id: 'u2', name: 'Jenny Zents',   imgUrl: 'assets/img/demo/3.jpg' };
    const author3: TaskAssignee = { id: 'u3', name: 'Michael Bolta', imgUrl: 'assets/img/demo/2.jpg' };

    this.messages = projects.flatMap((project, i) => [
      {
        id: `msg_${project.id}_1`,
        author: [author1, author2, author3][i % 3],
        project,
        status: project.status,
        body: `${project.name} is progressing well. Key milestones are being met and the team is aligned on the next sprint goals.`,
        createdAt: daysAgo(i + 1),
      },
      {
        id: `msg_${project.id}_2`,
        author: [author2, author3, author1][i % 3],
        project,
        status: project.status,
        body: `Weekly standup summary for ${project.name}: blocked items have been resolved and delivery is on schedule.`,
        createdAt: daysAgo(i + 4),
      },
    ]).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  postMessage(): void {
    const body = this.newBody.trim();
    if (!body || !this.portfolio || !this.projects[0]) return;
    const author: TaskAssignee = { id: 'u1', name: 'David Smith', imgUrl: 'assets/img/demo/1.jpg' };
    this.messages = [{
      id: 'msg_' + Date.now(),
      author,
      project: this.projects[0],
      status: this.portfolio.projectIds.length > 0 ? 'on_track' : 'on_track',
      body,
      createdAt: new Date(),
    }, ...this.messages];
    this.newBody = '';
    this.cd.markForCheck();
  }

  statusLabel(status: string): string {
    return { on_track: 'On Track', at_risk: 'At Risk', off_track: 'Off Track' }[status] ?? status;
  }

  statusColor(status: string): string {
    return { on_track: '#10b981', at_risk: '#f59e0b', off_track: '#ef4444' }[status] ?? '#94a3b8';
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

  timeAgo(date: Date): string {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }
}
