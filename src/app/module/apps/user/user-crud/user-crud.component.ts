import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-crud',
  imports: [],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent {
  constructor(private dialogRef: MatDialogRef<UserCrudComponent>) {}


  
  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Xử lý lưu dữ liệu ở đây
    this.dialogRef.close({ success: true }); // hoặc truyền dữ liệu vừa nhập
  }
}
