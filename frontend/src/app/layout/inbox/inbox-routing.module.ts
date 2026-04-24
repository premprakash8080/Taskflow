import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InboxMainComponent } from './components/inbox-main/inbox-main.component';

const routes: Routes = [
  { path: '', component: InboxMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
