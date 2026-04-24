import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { ProjectListViewComponent } from './components/project-list-view/project-list-view.component';
import { ProjectTimelineComponent } from './components/project-timeline/project-timeline.component';
import { ProjectMembersComponent } from './components/project-members/project-members.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: ':projectId',
        component: ProjectComponent,
        children: [
          { path: '',         redirectTo: 'list', pathMatch: 'full' },
          { path: 'list',     component: ProjectListViewComponent },
          { path: 'board',    component: ProjectBoardComponent },
          { path: 'timeline', component: ProjectTimelineComponent },
          { path: 'members',  component: ProjectMembersComponent },
          { path: 'settings', component: ProjectSettingsComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
