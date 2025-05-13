import { Routes } from '@angular/router';
import { DashboardComponent } from './apps/dashboard/dashboard.component';
import { UserComponent } from './apps/user/user.component';
import { MenuGuard } from '../core/guards/menu.guard';

export const AppsRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MenuGuard]
  },
    {
    path: 'user',
    component: UserComponent,
    canActivate: [MenuGuard]
  },




  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
