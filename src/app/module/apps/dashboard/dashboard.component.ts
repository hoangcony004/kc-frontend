import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Kho_Cang_Service } from '../../../core/services/khocang_service.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { Title } from '@angular/platform-browser';
import { ThemeModule } from '../../../shared/theme.module';
import { HeaderComponent } from '../../../shared/page/header/header.component';
import { NavbarComponent } from '../../../shared/page/navbar/navbar.component';
import { FooterComponent } from '../../../shared/page/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ThemeModule, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  constructor(
    private router: Router,
    private service: Kho_Cang_Service,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
    private titleService: Title,
  ) {}
  ngOnInit(): void {
    this.spinnerService.hide();
    this.titleService.setTitle(this.title);
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      // Gọi API để thêm token vào blacklist
      this.service.apiLogout(token).subscribe({
        next: (response) => {
          console.log('Logout response:', response);
          // Xóa token và menu từ localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('menu');

          this.toastr.success('Đăng xuất thành công', 'Thông báo');
          // Đợi 1 giây trước khi chuyển hướng
          timer(1000).subscribe(() => {
            this.router.navigate(['/auth/login']).then(() => {
              window.location.reload();
            });
          });
        },
        error: (error: HttpErrorResponse) => {
          // Ngay cả khi có lỗi, vẫn xóa token và chuyển hướng
          localStorage.removeItem('token');
          localStorage.removeItem('menu');
          this.toastr.error('Đăng xuất thất bại', 'Lỗi');
          // Đợi 1 giây trước khi chuyển hướng
          timer(1000).subscribe(() => {
            this.router.navigate(['/auth/login']).then(() => {
              window.location.reload();
            });
          });
        },
      });
    } else {
      // Nếu không có token, chỉ cần chuyển hướng
      this.router.navigate(['/auth/login']);
    }
  }
}
