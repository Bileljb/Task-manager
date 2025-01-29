import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit(): void {
    if (!this.user) {
      console.error('User data is missing!');
      return;
    }

    this.authService.signUp(this.user).subscribe({
      next: (response: { success: boolean; user: any }) => {
        if (response.success && response.user) {
          console.log('User created successfully:', response.user);
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
        console.error('Failed to signup:', err);
      },
    });
  }
}
