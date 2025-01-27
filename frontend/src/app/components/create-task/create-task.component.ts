import { Component, Output, EventEmitter,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { NgFor } from '@angular/common';
import { FormsModule, } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  imports: [NgFor, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() close = new EventEmitter<void>();
  
  task: any = {
    title: '',
    category: '',
    priority: '',
    status: '',
    deadline: ''
};

    categories = ['Work', 'Personal', 'Study', 'Other'];
    priorities = ['Low', 'Medium', 'High'];
    statuses = ['Todo', 'In Progress', 'Completed'];
  
    constructor(
      private route: ActivatedRoute,
      private taskService: TaskServiceService,
      private router: Router
    ) {}

    createTask(): void {
      if (!this.task) {
        console.error('Task data is missing!');
        return;
      }
  
      this.taskService.createTask(this.task).subscribe({
        next: (response: { success: boolean; task: any }) => {
          if (response.success && response.task) {
            console.log('Task created successfully:', response.task);
            this.router.navigate(['/task-board']);
          }
        },
        error: (err: any) => {
          console.error('Failed to create task:', err);
        },
      });
    }
    cancelCreate(): void {
      this.router.navigate(['/task-board']); 
    }
}