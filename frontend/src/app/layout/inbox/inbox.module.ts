import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxMainComponent } from './components/inbox-main/inbox-main.component';
import { InboxListComponent } from './components/inbox-list/inbox-list.component';
import { InboxItemComponent } from './components/inbox-item/inbox-item.component';
import { InboxDetailComponent } from './components/inbox-detail/inbox-detail.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { FiltersBarComponent } from './components/filters-bar/filters-bar.component';


@NgModule({
  declarations: [
    InboxMainComponent,
    InboxListComponent,
    InboxItemComponent,
    InboxDetailComponent,
    ActivityFeedComponent,
    FiltersBarComponent,
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SharedModule,
  ]
})
export class InboxModule { }
