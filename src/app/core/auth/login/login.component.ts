import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Kho_Cang_Service,
  LoginRequest,
} from '../../services/khocang_service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  title = 'Đăng nhập hệ thống';
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private service: Kho_Cang_Service,
    private toastr: ToastrService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin đăng nhập', 'Lỗi');
      return;
    }

    this.isLoading = true;
    const loginRequest = new LoginRequest();
    loginRequest.username = this.username;
    loginRequest.password = this.password;

    this.service.apiLogin(loginRequest).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS' && response.data?.token) {
          // Lưu token và menu vào localStorage
          localStorage.setItem('token', response.data.token);
          if (response.data.menu) {
            localStorage.setItem('menu', response.data.menu);
          }

          this.toastr.success('Đăng nhập thành công', 'Thông báo');
          // Đợi 2 giây trước khi chuyển hướng
          timer(1000).subscribe(() => {
            this.router.navigate(['/apps/dashboard']).then(() => {
              window.location.reload();
            });
          });
        } else {
          this.isLoading = false;
          this.toastr.error(response.message || 'Đăng nhập thất bại', 'Lỗi');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Login error:', error);
        if (error.status === 0) {
          this.toastr.error(
            'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.',
            'Lỗi'
          );
        } else if (error.status === 401) {
          this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng', 'Lỗi');
        } else if (error.status === 500) {
          this.toastr.error('Lỗi máy chủ. Vui lòng thử lại sau.', 'Lỗi');
        } else {
          this.toastr.error('Đăng nhập thất bại. Vui lòng thử lại sau.', 'Lỗi');
        }
      },
      complete: () => {
        // Chỉ reset loading khi đăng nhập thành công
        if (!localStorage.getItem('token')) {
          this.isLoading = false;
        }
      },
    });
  }
}
