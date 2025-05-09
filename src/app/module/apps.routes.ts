import { Routes } from '@angular/router';
import { DashboardComponent } from './apps/dashboard/dashboard.component';

export const AppsRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
