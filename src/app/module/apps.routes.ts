import { Routes } from '@angular/router';
import { DashboardComponent } from './apps/dashboard/dashboard.component';
import { UserComponent } from './apps/user/user.component';

export const AppsRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
    {
    path: 'user',
    component: UserComponent,
  },




  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
