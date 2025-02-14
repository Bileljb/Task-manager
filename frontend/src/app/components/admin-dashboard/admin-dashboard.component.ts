import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})



export class AdminDashboardComponent {

  constructor(private router: Router) {}

  isCollapsed = false;
  userData = localStorage.getItem('user') 
  user = this.userData? JSON.parse(this.userData) : null

  // Toggle the sidebar
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.router.navigate(['/']);
  }
}
