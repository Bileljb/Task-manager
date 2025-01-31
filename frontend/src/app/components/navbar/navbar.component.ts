import { Component } from '@angular/core';
import { OnInit } from '@angular/core'; 
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private authService: AuthServiceService) {}

  
}
