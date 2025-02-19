import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    if (this.user) {
      this.authService.signUp(this.user).subscribe(
        (response: { success: boolean; user: any; message: string }) => {
          if (response.success && response.user) {
            this.successMessage = response.message;
            this.router.navigate(['/verify-email']); // Redirect on success
          }
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    }
  }
  
}
