import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/adminService/admin.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports:[CommonModule],
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  tasks: Task[] = [];
  employee: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    
    
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.fetchEmployee(employeeId);
    } else {
      this.handleMissingEmployeeId();
    }
  }
  
  

  private handleMissingEmployeeId(): void {
    console.error('Employee ID is missing in the route!');
    this.closeDetails();
  }

  fetchEmployee(employeeId: string): void {
    this.adminService.getEmployeeById(employeeId).subscribe({
      next: (response: { success: boolean; message: string; employee: any; employeeTasks: any }) => {
        if (response.success && response.employee && response.employeeTasks) {
          this.employee = response.employee;
          this.tasks = [...response.employeeTasks] 
          this.successMessage = response.message;
          console.log(this.employee)
        }
        else if(response.success && response.employee && !response.employeeTasks){
          this.employee = response.employee;
          console.log('There are no recent tasks');
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
