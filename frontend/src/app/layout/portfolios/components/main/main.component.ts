import { Component } from '@angular/core';

@Component({
  selector: 'vex-portfolios-main',
  template: `
    <div class="portfolios-placeholder">
      <mat-icon svgIcon="mat:assessment"></mat-icon>
      <h2>Portfolios</h2>
      <p>Track progress across multiple projects in one place.</p>
    </div>
  `,
  styles: [`
    .portfolios-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      color: rgba(0,0,0,0.38);
    }
    .portfolios-placeholder mat-icon {
      font-size: 56px;
      width: 56px;
      height: 56px;
      margin-bottom: 12px;
    }
    .portfolios-placeholder h2 { margin: 0 0 8px; font-size: 20px; }
    .portfolios-placeholder p { margin: 0; font-size: 14px; }
  `]
})
export class MainComponent {}
