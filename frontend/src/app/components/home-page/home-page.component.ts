import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, NavbarComponent,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomeComponent{
  isAuthenticated = false;

  constructor(private authService: AuthServiceService) {}

}