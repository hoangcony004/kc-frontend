import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule],
  template: `
    <router-outlet></router-outlet>
    <ngx-spinner></ngx-spinner>
  `
})
export class AppComponent {
  title = 'kc_frontend';
}
