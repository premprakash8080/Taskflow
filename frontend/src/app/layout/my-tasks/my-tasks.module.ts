import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTasksRoutingModule } from './my-tasks-routing.module';
import { MainComponent } from './components/main/main.component';
import { MyTasksMainComponent } from './components/my-tasks-main/my-tasks-main.component';
import { TaskSectionsComponent } from './components/task-sections/task-sections.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';
import { TaskDetailsPanelComponent } from './components/task-details-panel/task-details-panel.component';


@NgModule({
  declarations: [
    MainComponent,
    MyTasksMainComponent,
    TaskSectionsComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFiltersComponent,
    TaskDetailsPanelComponent
  ],
  imports: [
    CommonModule,
    MyTasksRoutingModule
  ]
})
export class MyTasksModule { }
