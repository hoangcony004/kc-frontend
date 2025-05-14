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
import { Kho_Cang_Service, PageModel, SysUser } from '../../../core/services/khocang_service.service';
import { PAGE_SIZE } from '../../../core/custom/constants';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    ThemeModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit{
  title = 'Quản lý người dùng';

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private titleService: Title,
    private service: Kho_Cang_Service,
    private toastr: ToastrService,
  ) {}

  pageModel: PageModel = new PageModel({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    strKey: undefined,
  });
  
  data: SysUser[] = [];
  totalItems: number = 0;
  
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.loadData();
  }
  
  loadData(): void {
    this.service.apiPrivateUsersSearchPaging(this.pageModel).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.data = response.data ?? [];
          // this.totalItems = response.data.total;
        } else {
          console.error('Lỗi khi tải dữ liệu:', response.message);
          this.toastr.error(response.message || 'Không thể tải dữ liệu', 'Lỗi');
        }
      },
      error: (err) => {
        console.error('Lỗi kết nối đến server:', err);
        this.toastr.error('Lỗi kết nối đến server', 'Lỗi');
      }
    });
  }  

  onSearch() {
    this.loadData();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserCrudComponent, {
      ...this.commonService.configDialog('80%', {}),
      disableClose: true
    });
  }
}

