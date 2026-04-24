import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTasksMainComponent } from './components/my-tasks-main/my-tasks-main.component';

const routes: Routes = [
  { path: '', component: MyTasksMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTasksRoutingModule { }
