import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }

    this.authService.logout(token).subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error status:', error.status);
        console.error('Logout error message:', error.message);
        console.error('Logout error details:', error.error);
        // Vẫn xóa token và chuyển về trang login ngay cả khi có lỗi
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
} 