import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, combineLatest } from 'rxjs';
import { Portfolio, Project, Task, TaskAssignee } from 'src/app/core/models/task.model';
import { PortfoliosService } from '../../service/portfolios.service';
import { MOCK_TASKS } from 'src/static-data/taskflow-data';

export interface WorkloadMember {
  assignee: TaskAssignee;
  projectBreakdown: { project: Project; taskCount: number; completedCount: number }[];
  totalTasks: number;
  completedTasks: number;
}

@Component({
  selector: 'vex-portfolio-workload',
  templateUrl: './portfolio-workload.component.html',
  styleUrls: ['./portfolio-workload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioWorkloadComponent implements OnInit, OnDestroy {
  portfolio: Portfolio | undefined;
  projects: Project[] = [];
  members: WorkloadMember[] = [];
  maxTasks = 1;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private portfoliosService: PortfoliosService,
    private cd: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>,
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
        this.buildWorkload(projects);
        this.applyGridTemplate(projects.length);
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private applyGridTemplate(projectCount: number): void {
    const projCols = Array(projectCount).fill('100px').join(' ');
    const tpl = `220px ${projCols} 80px 1fr`;
    this.el.nativeElement.style.setProperty('--pw-grid', tpl);
  }

  private buildWorkload(projects: Project[]): void {
    const projectIds = projects.map(p => p.id);
    const tasks = MOCK_TASKS.filter(t => t.projectId && projectIds.includes(t.projectId));

    // Collect unique assignees
    const assigneeMap = new Map<string, TaskAssignee>();
    for (const task of tasks) {
      if (task.assignee) assigneeMap.set(task.assignee.id, task.assignee);
    }

    this.members = Array.from(assigneeMap.values()).map(assignee => {
      const myTasks = tasks.filter(t => t.assignee?.id === assignee.id);
      const projectBreakdown = projects.map(project => ({
        project,
        taskCount: myTasks.filter(t => t.projectId === project.id).length,
        completedCount: myTasks.filter(t => t.projectId === project.id && t.completed).length,
      }));
      return {
        assignee,
        projectBreakdown,
        totalTasks: myTasks.length,
        completedTasks: myTasks.filter(t => t.completed).length,
      };
    }).sort((a, b) => b.totalTasks - a.totalTasks);

    this.maxTasks = Math.max(1, ...this.members.map(m => m.totalTasks));
  }

  workloadPct(member: WorkloadMember): number {
    return Math.round((member.totalTasks / this.maxTasks) * 100);
  }

  workloadColor(member: WorkloadMember): string {
    const ratio = member.totalTasks / this.maxTasks;
    if (ratio >= 0.8) return '#ef4444';
    if (ratio >= 0.5) return '#f59e0b';
    return '#10b981';
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
