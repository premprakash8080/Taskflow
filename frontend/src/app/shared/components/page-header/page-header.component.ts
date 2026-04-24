import { Component, Input } from '@angular/core';

export interface Breadcrumb {
  label: string;
  route?: string;
}

@Component({
  selector: 'vex-page-header',
  template: `
    <div class="page-header">
      <div class="page-header__title-row">
        <div class="page-header__title-block">
          <h1 class="page-header__title">{{ title }}</h1>
          <div class="page-header__breadcrumbs" *ngIf="breadcrumbs?.length">
            <span *ngFor="let b of breadcrumbs; let last = last" class="breadcrumb-item">
              {{ b.label }}<span *ngIf="!last" class="breadcrumb-sep">/</span>
            </span>
          </div>
        </div>
        <div class="page-header__actions">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      padding: 16px 24px 12px;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      background: white;
      flex-shrink: 0;
    }
    .page-header__title-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .page-header__title-block { flex: 1; }
    .page-header__title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: rgba(0,0,0,0.87);
    }
    .page-header__breadcrumbs {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }
    .breadcrumb-item {
      font-size: 12px;
      color: rgba(0,0,0,0.42);
    }
    .breadcrumb-sep { margin: 0 4px; }
    .page-header__actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() breadcrumbs: Breadcrumb[] = [];
}
