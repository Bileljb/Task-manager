import { Component} from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-email-verification',
  imports:[CommonModule, FormsModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent{
  code: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onVerifyEmail() {
    if (this.code) {
      this.authService.verifyEmail(this.code).subscribe(
        (response) => {
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    } else {
      this.errorMessage = 'Please enter the verification code.';
    }
  }
}