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
    taskId ? this.fetchTask(taskId) : this.handleMissingTaskId();
  }
  
  private handleMissingTaskId(): void {
    console.error('Task ID is missing in the route!');
    this.closeDetails();
  }
  
  fetchTask(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe(
      (response: { success: boolean; task: any }) => {
        if (response.success && response.task) {
          this.task = response.task;
          this.editableTask = { ...response.task }; 
        }
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Failed to fetch task.';
      }
    );
  }
  
  

  updateTask(): void {
    if (!this.editableTask._id) {
      console.error('Task ID is missing or invalid!');
      return;
    }
  
    const updatedTask = { ...this.editableTask, updatedAt: new Date() };
    console.log('Attempting to update task:', updatedTask);
  
    this.taskService.updateTask(updatedTask).subscribe(
      ({ success, task }) => {
        if (success && task) {
          this.task = task;
          console.log('Task updated successfully:', task);
        }
      },
      (error) => (this.errorMessage = error.error?.message || 'Failed to update task.')
    );
  }
  
  
  

  closeDetails(): void {
    this.router.navigate(['/task-board']);
  }
}
