import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./module/apps.routes').then((m) => m.AppsRoutes),
  },
];
