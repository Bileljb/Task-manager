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
  
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: (response) => {
          if (response.success) {
            // Iterate through taskStatus categories and remove the task with the given ID
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
  

}

