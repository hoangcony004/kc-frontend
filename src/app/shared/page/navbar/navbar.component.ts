import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  id: number;
  label: string;
  link: string;
  icon: string | null;
  permission: string;
  parent: number | null;
  children?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit() {
    const menu = localStorage.getItem('menu');
    if (menu) {
      const rawItems: MenuItem[] = JSON.parse(menu);
      const tree = this.buildMenuTree(rawItems);

      // Đưa "Dashboard" (label === 'Dashboard') lên đầu danh sách
      this.menuItems = tree.sort((a, b) => {
        if (a.label === 'Dashboard') return -1;
        if (b.label === 'Dashboard') return 1;
        return 0;
      });
    }
  }

  buildMenuTree(items: MenuItem[]): MenuItem[] {
    const map = new Map<number, MenuItem>();
    const roots: MenuItem[] = [];

    items.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    items.forEach((item) => {
      if (item.parent === null) {
        roots.push(map.get(item.id)!);
      } else {
        const parent = map.get(item.parent);
        if (parent) {
          parent.children!.push(map.get(item.id)!);
        }
      }
    });

    return roots;
  }
}
