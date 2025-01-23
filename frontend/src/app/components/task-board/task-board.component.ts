import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import { HttpClient } from '@angular/common/http';

interface Task {
  title: string;
  status: string;
}

interface TaskCategory {
  status: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-board',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  private taskService = inject(TaskServiceService);

  // Sidebar logic
  isCollapsed = false;
  users = [{ name: 'Tom' }];
  teams = [{ name: 'Team 1' }];

  // Structure to store tasks by status
  taskStatus: TaskCategory[] = [
    { status: 'todo', tasks: [] },
    { status: 'inProgress', tasks: [] },
    { status: 'completed', tasks: [] },
  ];

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
            const category = this.taskStatus.find((item) => item.status === this.mapStatus(task.status));
            if (category) {
              category.tasks.push({ title: task.title, status: task.status });
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
  


  // Map API status values to local status keys
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

  // Method to get tasks by their status
  getTasksByStatus(status: string): Task[] {
    const statusObject = this.taskStatus.find((item) => item.status === status);
    return statusObject ? statusObject.tasks : [];
  }
}
