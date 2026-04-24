import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PortfoliosRoutingModule,
    MatIconModule,
  ]
})
export class PortfoliosModule { }
