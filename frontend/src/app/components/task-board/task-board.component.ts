import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import {Task, TaskCategory} from '../../models/task.model';
import { RouterLink } from '@angular/router';

import { taskStatus } from '../../States/taskState';


@Component({
  selector: 'app-task-board',
  imports: [NgIf, NgFor, CommonModule, RouterLink],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  taskStatus: TaskCategory[] = JSON.parse(JSON.stringify(taskStatus));
  @Input() task?: Task
  private taskService = inject(TaskServiceService);

  // Sidebar logic
  isCollapsed = false;
  users = [{ name: 'Tom' }];
  teams = [{ name: 'Team 1' }];
  


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

  addNewTask() {
    // Define what happens when the + button is clicked
    console.log("Add button clicked! Implement your logic here.");
  }
  
  deleteTask(task: any): void {
    // Replace with your actual logic to delete the task
    console.log('Task deleted:', task);

    // Example logic: Remove the task from the list
    this.taskStatus.forEach(status => {
      status.tasks = status.tasks.filter(t => t !== task);
    });
  }

}

