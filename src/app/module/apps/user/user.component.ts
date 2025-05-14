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
import { PAGE_SIZE } from '../../../core/custom/constants';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

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
  totalPages = 0  ;
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
      }
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
  

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserCrudComponent, {
      ...this.commonService.configDialog('80%', {}),
      disableClose: true,
    });
  }
}
