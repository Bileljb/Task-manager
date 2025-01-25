import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [NgIf, DatePipe],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  task: any = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.fetchTask(taskId);
    }
  }

  fetchTask(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (response: { success: boolean; task: any }) => {
        if (response.success && response.task) {
          this.task = response.task;
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch task:', err);
      },
    });
  }

  closeDetails(): void {
    this.router.navigate(['/task-board']); // Navigate to task board
  }

  navigateToTaskBoard(): void {
    this.router.navigate(['/task-board']); // Ensure navigation happens smoothly
  }
}
