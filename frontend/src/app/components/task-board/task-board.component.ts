import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import { Task, TaskCategory } from '../../models/task.model';
import { RouterLink, Router } from '@angular/router';
import { taskStatus } from '../../States/taskState';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, RouterLink, DragDropModule, CdkDropList],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  private authService = inject(AuthServiceService);
  private taskService = inject(TaskServiceService);
  private router: Router = inject(Router);

  taskStatus: TaskCategory[] = JSON.parse(JSON.stringify(taskStatus));
  @Input() task?: Task;
  user = JSON.parse(localStorage.getItem('user') || '{}');
  isCollapsed = false;

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect if not logged in
    } else {
      this.getAllTasks();
    }
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: any) => {
        if (response.success && response.tasks) {
          this.organizeTasks(response.tasks);
          console.log('Grouped tasks:', this.taskStatus);
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  private organizeTasks(tasks: any[]): void {
    tasks.forEach((task: any) => {
      const category = this.taskStatus.find(
        (item) => item.status === this.mapStatus(task.status)
      );

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
          updatedAt: task.updatedAt,
        });
      }
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

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  deleteTask(event: MouseEvent, taskId: string): void {
    event.stopPropagation();

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

      event.previousContainer.data.splice(event.previousIndex, 1);
      event.container.data.splice(event.currentIndex, 0, task);

      if (newStatus === 'Todo' || newStatus === 'In Progress' || newStatus === 'Completed') {
        task.status = newStatus;
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
