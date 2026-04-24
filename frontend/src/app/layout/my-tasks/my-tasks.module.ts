import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTasksRoutingModule } from './my-tasks-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MyTasksRoutingModule
  ]
})
export class MyTasksModule { }
