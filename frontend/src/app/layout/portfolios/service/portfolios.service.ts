import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Portfolio, Project } from 'src/app/core/models/task.model';
import { MOCK_PORTFOLIOS, MOCK_PROJECTS } from 'src/static-data/taskflow-data';

@Injectable({ providedIn: 'root' })
export class PortfoliosService {
  private portfoliosSubject = new BehaviorSubject<Portfolio[]>(MOCK_PORTFOLIOS);
  portfolios$ = this.portfoliosSubject.asObservable();

  getPortfolio(id: string): Observable<Portfolio | undefined> {
    return this.portfolios$.pipe(map(ps => ps.find(p => p.id === id)));
  }

  getProjectsForPortfolio(portfolioId: string): Observable<Project[]> {
    return this.portfolios$.pipe(
      map(ps => {
        const portfolio = ps.find(p => p.id === portfolioId);
        if (!portfolio) return [];
        return MOCK_PROJECTS.filter(proj => portfolio.projectIds.includes(proj.id));
      })
    );
  }

  addPortfolio(name: string, color: string, owner: import('src/app/core/models/task.model').TaskAssignee): void {
    const newPortfolio: Portfolio = {
      id: 'pf_' + Date.now(),
      name,
      color,
      owner,
      members: [owner],
      projectIds: [],
      createdAt: new Date(),
    };
    this.portfoliosSubject.next([...this.portfoliosSubject.value, newPortfolio]);
  }

  updatePortfolio(updated: Portfolio): void {
    this.portfoliosSubject.next(
      this.portfoliosSubject.value.map(p => p.id === updated.id ? updated : p)
    );
  }
}
