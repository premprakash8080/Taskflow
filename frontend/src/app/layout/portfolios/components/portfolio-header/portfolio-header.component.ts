import { Component, Input } from '@angular/core';
import { Portfolio } from 'src/app/core/models/task.model';

@Component({
  selector: 'vex-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.scss'],
})
export class PortfolioHeaderComponent {
  @Input() portfolio!: Portfolio;

  views = [
    { path: 'overview',  label: 'Overview',  icon: 'mat:assessment' },
    { path: 'workload',  label: 'Workload',  icon: 'mat:people' },
    { path: 'messages',  label: 'Messages',  icon: 'mat:chat_bubble_outline' },
  ];

  avatarInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  avatarColor(id: string): string {
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#0ea5e9'];
    let n = 0;
    for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
    return colors[n % colors.length];
  }
}
