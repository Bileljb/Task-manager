import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  task: any = {
    title: '',
    category: '',
    priority: '',
    status: '',
    deadline: '',
    createdBy: ''
  };
  successMessage: string = '';
  errorMessage: string = '';

  categories = ['Work', 'Personal', 'Study', 'Other'];
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Todo', 'In Progress', 'Completed'];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = this.authService.getUser();
    if (user) {
      this.task.createdBy = user.id
    } else {
      this.errorMessage = 'User not found. Please log in again.';
      this.router.navigate(['/login']);
    }
  }

  createTask() {
    if (this.task) {
      this.taskService.createTask(this.task).subscribe(
        (response) => {
          if (response.success && response.task) {
            console.log('Task created successfully:', response.task);
            this.successMessage = response.message;
            this.router.navigate(['/task-board']);
          }
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    }
  }
  
  cancelCreate(): void {
    this.router.navigate(['/task-board']);
  }
}
