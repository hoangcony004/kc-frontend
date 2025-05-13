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
export class UserComponent implements OnInit{
  title = 'Quản lý người dùng';

  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserCrudComponent, {
      ...this.commonService.configDialog('80%', {}),
      disableClose: true
    });
  }
}

