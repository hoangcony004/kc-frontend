import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeModule } from '../../../shared/theme.module';
import { HeaderComponent } from '../../../shared/page/header/header.component';
import { NavbarComponent } from '../../../shared/page/navbar/navbar.component';
import { FooterComponent } from '../../../shared/page/footer/footer.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { CommonService } from '../../../core/custom/common.service';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    ThemeModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MatDialogModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserCrudComponent, {
      ...this.commonService.configDialog('80%', {}),
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Người dùng đồng ý!');
      } else {
        console.log('Người dùng hủy.');
      }
    });
  }
}

