import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import {Task, TaskCategory} from '../../models/task.model';
import { RouterLink,Router } from '@angular/router';
import { taskStatus } from '../../States/taskState';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  imports: [ CommonModule, RouterLink, DragDropModule,CdkDropList],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  constructor(private router: Router) {}
  taskStatus: TaskCategory[] = JSON.parse(JSON.stringify(taskStatus));
  @Input() task?: Task
  private taskService = inject(TaskServiceService);

  // Sidebar logic
  isCollapsed = false;
  userData = localStorage.getItem('user') 
  user = this.userData? JSON.parse(this.userData) : null

 

  ngOnInit(): void {
    this.getAllTasks();
  }

  // Fetch all tasks and organize them by status
  getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        if (response.success && response.tasks) {

          // Group tasks by status
          response.tasks.forEach((task: any) => {
            const category = this.taskStatus.find((item) => {return item.status === this.mapStatus(task.status) && this.user._id == task.createdBy});
            if (category) {
              category.tasks.push({
                _id: task._id,
                title: task.title,
                status: task.status,
                description: task.description,
                category: task.category,
                priority: task.priority,
                deadline: task.deadline,
                createdBy: task.createdBy,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
              });
            }
          });

          console.log('Grouped tasks:', this.taskStatus);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
  mapStatus(apiStatus: string): string {
    switch (apiStatus) {
      case 'Todo':
        return 'todo';
      case 'In Progress':
        return 'inProgress';
      case 'Completed':
        return 'completed';
      default:
        return '';
    }
  }

  // Toggle the sidebar
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
  deleteTask(event: MouseEvent, taskId: string): void {
    event.stopPropagation(); // Prevents the click event from propagating to the parent element
    
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: (response) => {
          if (response.success) {
            this.taskStatus.forEach((category) => {
              category.tasks = category.tasks.filter((task) => task._id !== taskId);
              
            });
            console.log('Task deleted successfully:', response.message);
          }
        },
        error: (err) => {
          console.error('Failed to delete task:', err);
        },
      });
    }
  }
  drop(event: CdkDragDrop<Task[]>, newStatus: string): void {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
  
      // Remove task from the previous column
      event.previousContainer.data.splice(event.previousIndex, 1);
  
      // Add task to the new column
      event.container.data.splice(event.currentIndex, 0, task);
  
      // Update task's status
      if (newStatus === 'Todo' || newStatus === 'In Progress' || newStatus === 'Completed') {
        task.status = newStatus; // Update the status in the model
        this.taskService.updateTaskStatus(task._id, newStatus).subscribe({
          next: () => console.log('Task status updated successfully'),
          error: (err) => console.error('Failed to update task status:', err),
        });
      } else {
        console.error('Invalid status:', newStatus);
      }
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.router.navigate(['/']);
  }

}

