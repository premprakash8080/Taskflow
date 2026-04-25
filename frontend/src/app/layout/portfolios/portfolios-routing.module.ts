import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { PortfoliosListComponent } from './components/portfolios-list/portfolios-list.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';
import { PortfolioWorkloadComponent } from './components/portfolio-workload/portfolio-workload.component';
import { PortfolioMessagesComponent } from './components/portfolio-messages/portfolio-messages.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: PortfoliosListComponent, pathMatch: 'full' },
      {
        path: ':portfolioId',
        component: PortfolioComponent,
        children: [
          { path: '',          redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview',  component: PortfolioOverviewComponent },
          { path: 'workload',  component: PortfolioWorkloadComponent },
          { path: 'messages',  component: PortfolioMessagesComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfoliosRoutingModule { }
