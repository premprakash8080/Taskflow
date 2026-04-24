import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InboxFilter } from '../../service/inbox.service';

@Component({
  selector: 'vex-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  @Input() activeFilter: InboxFilter = 'all';
  @Output() filterChange = new EventEmitter<InboxFilter>();

  filters: { value: InboxFilter; label: string }[] = [
    { value: 'all',       label: 'All' },
    { value: 'assigned',  label: 'Assigned' },
    { value: 'mentioned', label: '@Mentions' },
    { value: 'comment',   label: 'Comments' },
    { value: 'due_soon',  label: 'Due Soon' },
  ];
}
