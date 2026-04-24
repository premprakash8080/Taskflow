import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ActivityPanelComponent } from './components/activity-panel/activity-panel.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ProjectListComponent,
    TaskBoardComponent,
    TaskItemComponent,
    ActivityPanelComponent,
    CreateTaskModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
