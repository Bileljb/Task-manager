import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  apiUrl = 'http://localhost:5000/api/tasks/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all tasks with authorization
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Create a new task with authorization
  createTask(task: any): Observable<any> {
    const url = `${this.apiUrl}create-new-task`;
    return this.http.post(url, task, { headers: this.getHeaders() });
  }

  // Get a task by ID with authorization
  getTaskById(taskId: string): Observable<any> {
    const url = `${this.apiUrl}${taskId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Delete a task with authorization
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}delete/${taskId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  // Update a task with authorization
  updateTask(task: any): Observable<any> {
    const taskId = task._id;
    const updateUrl = `${this.apiUrl}update/${taskId}`;
    return this.http.put(updateUrl, task, { headers: this.getHeaders() });
  }

  // Update task status with authorization
  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${taskId}/status`, { status }, { headers: this.getHeaders() });
  }
}
