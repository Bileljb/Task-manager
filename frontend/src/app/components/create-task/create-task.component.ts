import { Component, Output, EventEmitter, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-create-task',
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() close = new EventEmitter<void>();
  // task !:Task
  task: any = {
    title: '',
    category: '',
    priority: '',
    status: '',
    deadline: ''
  };
  successMessage: string = '';
  errorMessage: string = '';


  categories = ['Work', 'Personal', 'Study', 'Other'];
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Todo', 'In Progress', 'Completed'];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router
  ) { }

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