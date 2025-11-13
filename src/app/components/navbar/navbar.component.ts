import { Component } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, HomeComponent, AboutComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
