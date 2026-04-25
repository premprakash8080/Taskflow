import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { PortfoliosRoutingModule } from './portfolios-routing.module';

import { MainComponent } from './components/main/main.component';
import { PortfoliosListComponent } from './components/portfolios-list/portfolios-list.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortfolioHeaderComponent } from './components/portfolio-header/portfolio-header.component';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';
import { PortfolioWorkloadComponent } from './components/portfolio-workload/portfolio-workload.component';
import { PortfolioMessagesComponent } from './components/portfolio-messages/portfolio-messages.component';

@NgModule({
  declarations: [
    MainComponent,
    PortfoliosListComponent,
    PortfolioComponent,
    PortfolioHeaderComponent,
    PortfolioOverviewComponent,
    PortfolioWorkloadComponent,
    PortfolioMessagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PortfoliosRoutingModule,
    SharedModule,
  ]
})
export class PortfoliosModule { }
