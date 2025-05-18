import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemeModule } from '../../../../shared/theme.module';
import { STATUS_ACTION, SUCCESS } from '../../../../core/custom/constants';
import {
  Kho_Cang_Service,
  SysRole,
  SysUser,
  SysUserRoleDTO,
} from '../../../../core/services/khocang_service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  imports: [ThemeModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css',
})
export class UserCrudComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UserCrudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataRef: { key: number; actionType: number },
    private toastr: ToastrService,
    private service: Kho_Cang_Service
  ) {}

  statusAction = STATUS_ACTION;
  target: SysUser = new SysUser();
  roleUser: SysUserRoleDTO = new SysUserRoleDTO();
  sysRole: SysRole = new SysRole();
  lstRole: any[] = [];
  selectedRoleId: number | null = null;

  ngOnInit(): void {
    this.loadRole();

    this.target.unitcode = this.generateCode();
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      // this.target.status = 0;
    }
  }

  loadData(): void {
    this.service.apiPrivateUsersGetOne(this.dataRef.key).subscribe({
      next: (res) => {
        if (res?.status === SUCCESS && res.data) {
          Object.assign(this.target, res.data);
          if (this.dataRef.actionType === this.statusAction.edit) {
            // this.target.password = '';
          }
        } else {
          this.toastr.error(res?.message || 'Không có dữ liệu!', 'Lỗi');
        }
      },
      error: (err) => {
        this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
      },
    });
  }

  loadRole() {
    this.service.apiPrivateRolesPostAll().subscribe({
      next: (res) => {
        if (res?.status === SUCCESS) {
          this.lstRole = res.data.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
        } else {
          this.toastr.error(
            res?.message || 'Không thể lấy danh sách quyền!',
            'Lỗi'
          );
        }
      },
      error: (err) => {
        this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
      },
    });
  }

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

    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.service.apiPrivateUsersInsert(this.target).subscribe({
        next: (res) => {
          if (res?.status === SUCCESS) {
            this.toastr.success(
              res.message || 'Thêm mới thành công!',
              'Thành công'
            );
            this.dialogRef.close(true);
          } else {
            this.toastr.error(res?.message || 'Không thể thêm mới!', 'Lỗi');
          }
        },
        error: (err) => {
          this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
        },
      });
    } else if (this.dataRef.actionType === STATUS_ACTION.edit) {
      this.service
        .apiPrivateUsersUpdate(this.dataRef.key, this.target)
        .subscribe({
          next: (res) => {
            if (res?.status === SUCCESS) {
              this.toastr.success(
                res.message || 'Chỉnh sửa thành công!',
                'Thành công'
              );
              this.dialogRef.close(true);
            } else {
              this.toastr.error(res?.message || 'Không thể chỉnh sửa!', 'Lỗi');
            }
          },
          error: (err) => {
            this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
          },
        });
    } else {
      const updateUserStatus = () => {
        this.target.status = 1;
        return this.service.apiPrivateUsersUpdate(
          this.dataRef.key,
          this.target
        );
      };

      const assignUserRole = () => {
        this.roleUser.userId = this.dataRef.key;
        this.roleUser.roleId = this.selectedRoleId!;
        return this.service.apiPrivateUsersRolesAssignRole(this.roleUser);
      };

      const handleApiResponse = (
        res: any,
        successMsg: string,
        errorMsg: string
      ) => {
        if (res?.status === SUCCESS) {
          this.toastr.success(res.message || successMsg, 'Thành công');
          return true;
        }
        this.toastr.error(res?.message || errorMsg, 'Lỗi');
        return false;
      };

      const handleApiError = (err: any) => {
        this.toastr.error(`Lỗi khi gọi API: ${err?.message}`, 'Lỗi');
      };

      forkJoin([updateUserStatus(), assignUserRole()]).subscribe({
        next: ([updateRes, roleRes]) => {
          const isUpdateSuccess = handleApiResponse(
            updateRes,
            '',
            'Không thể chỉnh sửa!'
          );
          const isRoleSuccess = handleApiResponse(
            roleRes,
            'Phân quyền thành công!',
            'Không thể phân quyền!'
          );

          if (isUpdateSuccess && isRoleSuccess) {
            this.dialogRef.close(true);
          }
        },
        error: handleApiError,
      });
    }
  }

  generateCode(): string {
    const prefix = 'code';
    const random = Math.floor(1000 + Math.random() * 9000); // Ví dụ: CODE1234
    return `${prefix}${random}`;
  }
}
