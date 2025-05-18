import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  imports: [
    NgClass,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
  ],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css',
})
export class DialogConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
