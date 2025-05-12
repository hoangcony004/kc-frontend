import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeModule } from '../../../shared/theme.module';
import { HeaderComponent } from '../../../shared/page/header/header.component';
import { NavbarComponent } from '../../../shared/page/navbar/navbar.component';
import { FooterComponent } from '../../../shared/page/footer/footer.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ThemeModule, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
