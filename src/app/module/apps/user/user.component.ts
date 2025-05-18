import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeModule } from '../../../shared/theme.module';
import { HeaderComponent } from '../../../shared/page/header/header.component';
import { NavbarComponent } from '../../../shared/page/navbar/navbar.component';
import { FooterComponent } from '../../../shared/page/footer/footer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { CommonService } from '../../../core/custom/common.service';
import { Title } from '@angular/platform-browser';
import {
  Kho_Cang_Service,
  PagedResultSysUser,
  PageModel,
  SysUser,
} from '../../../core/services/khocang_service.service';
import { PAGE_SIZE, STATUS_ACTION } from '../../../core/custom/constants';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogConfirmComponent } from '../../../shared/components/templates/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    ThemeModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatDialogModule,
    FormsModule,
    PaginationComponent,
    MatTooltipModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  title = 'Quản lý người dùng';

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private titleService: Title,
    private service: Kho_Cang_Service,
    private toastr: ToastrService
  ) {}

  pageModel: PagedResultSysUser = new PagedResultSysUser({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    strKey: '',
  });

  data: SysUser[] = [];
  totalItems = 0;
  totalPages = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.loadData();
  }

  loadData(): void {
    this.service.apiPrivateUsersSearchPaging(this.pageModel).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.data = response.data?.data ?? [];
          this.currentPage = response.data?.currentPage ?? 1;
          this.totalPages = response.data?.totalPages ?? 0;
          this.totalItems = response.data?.totalElements ?? 0;
          this.pageModel.currentPage = this.currentPage;
        } else {
          this.toastr.error(response.message || 'Không thể tải dữ liệu', 'Lỗi');
        }
      },
      error: () => {
        this.toastr.error('Lỗi kết nối đến server', 'Lỗi');
      },
    });
  }

  onSearch() {
    this.pageModel.currentPage = 1;
    this.loadData();
  }

  changePage(page: number): void {
    this.pageModel.currentPage = page;
    this.loadData();
  }

  getStatusText(status?: number): string {
    switch (status) {
      case 0:
        return 'Chưa kích hoạt';
      case 1:
        return 'Hoạt động';
      case 2:
        return 'Đã khóa';
      default:
        return 'Không xác định';
    }
  }

  getStatusClass(status?: number): string {
    switch (status) {
      case 0:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  openCreateDialog() {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: null,
          actionType: STATUS_ACTION.create,
        })
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }

  openDetailDialog(key: number) {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: key,
          actionType: STATUS_ACTION.detail,
        })
      )
      .afterClosed()
      .subscribe(() => {});
  }

  openEditDialog(key: number) {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: key,
          actionType: STATUS_ACTION.edit,
        })
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }

  openRoleDialog(key: number) {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('40%', {
          key: key,
          actionType: STATUS_ACTION.role,
        })
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }

  openDeleteDialog(key: number, title?: string) {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30%',
        data: {
          title: 'Xác nhận',
          message: `Bạn có chắc chắn xóa <b>${title}</b> ?`,
          color: 'text-danger',
          type: 1,
          icon: 'exclamation-triangle',
          isAppend: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          const user = localStorage.getItem('user');
          if (user) {
            const userData = JSON.parse(user);
            const currentUserId = userData.id;
      
            if (key === currentUserId) {
              this.toastr.warning('Tài khoản đăng đăng nhập không thể xóa!', 'Cảnh báo');
              return;
            }
          }
      
          this.service.apiPrivateUsersDelete(key).subscribe({
            next: (res) => {
              this.toastr.success(
                res.message || 'Xóa thành công!',
                'Thành công'
              );
              this.loadData();
            },
            error: (err) => {
              this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
            }
          });
        }
      });      
  }
}
