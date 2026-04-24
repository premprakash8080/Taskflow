import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { ProjectListViewComponent } from './components/project-list-view/project-list-view.component';
import { ProjectTimelineComponent } from './components/project-timeline/project-timeline.component';
import { ProjectMembersComponent } from './components/project-members/project-members.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';


@NgModule({
  declarations: [
    MainComponent,
    ProjectComponent,
    ProjectHeaderComponent,
    ProjectBoardComponent,
    ProjectListViewComponent,
    ProjectTimelineComponent,
    ProjectMembersComponent,
    ProjectSettingsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    DragDropModule,
  ]
})
export class ProjectsModule { }
