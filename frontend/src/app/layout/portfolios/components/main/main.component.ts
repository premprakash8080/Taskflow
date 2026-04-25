import { Component } from '@angular/core';

@Component({
  selector: 'vex-portfolios-main',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: flex; flex-direction: column; height: 100%; overflow: hidden; }']
})
export class MainComponent {}
