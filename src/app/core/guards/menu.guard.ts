import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const fullPath = this.getFullRoutePath(route);

    const menuList = JSON.parse(localStorage.getItem('menu') || '[]');

    // Nếu không có menu nào => chuyển về login
    if (!menuList || menuList.length === 0) {
      this.router.navigate(['auth/login']);
      return false;
    }

    const hasAccess = menuList.some((menu: any) => menu.link === fullPath);

    if (!hasAccess) {
      alert('Bạn không có quyền truy cập chức năng này!. Liên hệ Admin để có quyền truy cập.');
      // this.router.navigate(['/apps/dashboard']);
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }

  // Hàm dựng lại full path từ ActivatedRouteSnapshot
  private getFullRoutePath(route: ActivatedRouteSnapshot): string {
    let pathSegments: string[] = [];

    let current: ActivatedRouteSnapshot | null = route;
    while (current) {
      if (current.routeConfig?.path) {
        pathSegments.unshift(current.routeConfig.path);
      }
      current = current.parent;
    }

    return pathSegments.join('/');
  }
}
