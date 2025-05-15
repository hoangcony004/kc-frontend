import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeModule } from '../../../../shared/theme.module';
import { STATUS_ACTION, SUCCESS } from '../../../../core/custom/constants';
import {
  Kho_Cang_Service,
  SysUser,
} from '../../../../core/services/khocang_service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-crud',
  imports: [ThemeModule, FormsModule, CommonModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css',
})
export class UserCrudComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UserCrudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataRef: { key: string; actionType: number },
    private toastr: ToastrService,
    private service: Kho_Cang_Service
  ) {}

  statusAction = STATUS_ACTION;
  target: SysUser = new SysUser();

  ngOnInit(): void {
    this.target.unitcode = this.generateCode();
  }

  loadData(): void {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(frm: NgForm): void {
    console.log('Form valid:', frm.valid, 'Form invalid:', frm.invalid);

    if (frm.invalid) {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin!', 'Lỗi');
      return;
    }

    this.target.status = 0;

    // this.service.apiPrivateUsersInsert(this.target).subscribe({
    //   next: (response) => {
    //     if (response.status === 'SUCCESS') {
    //       this.toastr.success(
    //         response.message || 'Thêm mới thành công!',
    //         'Thành công'
    //       );
    //       this.onClose();
    //     } else {
    //       this.toastr.error(response.message || 'Không thể thêm mới!', 'Lỗi');
    //     }
    //   },
    //   error: () => {
    //     this.toastr.error('Lỗi kết nối đến server', 'Lỗi');
    //   },
    // });
    this.service.apiPrivateUsersInsert(this.target).subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res?.status === SUCCESS) {
          this.toastr.success(res.message || 'Thêm mới thành công!', 'Thành công');
          this.onClose();
        } else {
          this.toastr.error(res?.message || 'Không thể thêm mới!', 'Lỗi');
        }
      },
      error: (err) => {
        console.error('API lỗi:', err);
        this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
      }
    });
    
  }

  generateCode(): string {
    const prefix = 'code';
    const random = Math.floor(1000 + Math.random() * 9000); // Ví dụ: CODE1234
    return `${prefix}${random}`;
  }
}
