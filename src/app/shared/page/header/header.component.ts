import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kho_Cang_Service } from '../../../core/services/khocang_service.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../core/services/spinner.service';
import { timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  imageLink: string = '';

  constructor(
    private router: Router,
    private service: Kho_Cang_Service,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinnerService.hide();
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Lấy thông tin người dùng từ localStorage
      this.userName = userData.username;
      this.imageLink = userData.avatarUrl;
    } else {
      this.userName = 'Vô danh';
    }
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
          timer(500).subscribe(() => {
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
