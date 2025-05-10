import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  show() {
    this.spinner.show(undefined, {
      type: 'ball-spin-clockwise',
      size: 'large',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true,
      zIndex: 9999
    });
  }

  hide() {
    this.spinner.hide();
  }
} 