import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          this.successMessage = response.message;
          this.router.navigate(['/']); // Redirect to the dashboard on success
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
