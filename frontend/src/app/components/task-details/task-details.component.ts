import { Component, Output, EventEmitter, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  imports: [NgIf, NgFor, DatePipe, FormsModule, ],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  task: any = null;
  editableTask: any = {};
  categories = ['Work', 'Personal', 'Study', 'Other'];
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Todo', 'In Progress', 'Completed'];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.fetchTask(taskId);
    } else {
      console.error('Task ID is missing in the route!');
      this.closeDetails();
    }
  }

  fetchTask(taskId: string): void {
    if (!taskId) {
      console.error('Invalid task ID provided!');
      return;
    }

    this.taskService.getTaskById(taskId).subscribe({
      next: (response: { success: boolean; task: any }) => {
        if (response.success && response.task) {
          this.task = response.task;
          this.editableTask = { ...this.task }; // Clone the task for editing
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch task:', err);
      },
    });
  }

  updateTask() {
    if (this.editableTask._id) {
      const updatedTask = {
        ...this.editableTask,
        updatedAt: new Date(), // Update the timestamp
      };
  
      console.log('Attempting to update task:', updatedTask);
  
      this.taskService.updateTask(updatedTask).subscribe(
        (response) => {
          if (response.success) {
            this.task = response.task;
            console.log('Task updated successfully:', this.task);
          }
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    } else {
      console.error('Task ID is missing or invalid!');
    }
  }
  
  

  closeDetails(): void {
    this.router.navigate(['/task-board']); // Navigate back to the task board
  }
}
