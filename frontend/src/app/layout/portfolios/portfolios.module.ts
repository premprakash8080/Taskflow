import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PortfoliosRoutingModule
  ]
})
export class PortfoliosModule { }
