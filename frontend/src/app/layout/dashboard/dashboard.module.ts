import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ActivityPanelComponent } from './components/activity-panel/activity-panel.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectListComponent,
    TaskBoardComponent,
    TaskItemComponent,
    ActivityPanelComponent,
    CreateTaskModalComponent,
    CreateProjectModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
