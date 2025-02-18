import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/adminService/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports:[CommonModule],
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  employee: any = null;
  tasks: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log(employeeId)
    employeeId ? this.fetchEmployee(employeeId) : this.handleMissingEmployeeId();
  }

  private handleMissingEmployeeId(): void {
    console.error('Employee ID is missing in the route!');
    this.closeDetails();
  }

  fetchEmployee(employeeId: string): void {
    this.adminService.getEmployeeById(employeeId).subscribe({
      next: (response: { success: boolean; message: string; employee: any }) => {
        if (response.success && response.employee) {
          this.employee = response.employee;
          this.tasks = response.employee.tasks;
          this.successMessage = response.message;
          console.log(this.employee)
          console.log(this.tasks)
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to fetch employee.';
      },
    });
  }

  closeDetails(): void {
    this.router.navigate(['/tm-admin']);
  }
}
