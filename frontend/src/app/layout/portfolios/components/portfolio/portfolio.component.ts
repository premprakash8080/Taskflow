import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Portfolio } from 'src/app/core/models/task.model';
import { PortfoliosService } from '../../service/portfolios.service';

@Component({
  selector: 'vex-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolio: Portfolio | undefined;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private portfoliosService: PortfoliosService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.params.pipe(
        switchMap(params => this.portfoliosService.getPortfolio(params['portfolioId']))
      ).subscribe(p => {
        this.portfolio = p;
        this.cd.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
