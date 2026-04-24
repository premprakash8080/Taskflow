import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      { path: 'dashboard',  loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'inbox',      loadChildren: () => import('./layout/inbox/inbox.module').then(m => m.InboxModule) },
      { path: 'my-tasks',   loadChildren: () => import('./layout/my-tasks/my-tasks.module').then(m => m.MyTasksModule) },
      { path: 'projects',   loadChildren: () => import('./layout/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'portfolios', loadChildren: () => import('./layout/portfolios/portfolios.module').then(m => m.PortfoliosModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
