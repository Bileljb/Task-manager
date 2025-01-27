import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  apiUrl = 'http://localhost:5000/api/tasks/'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Create a new task
  createTask(task: any): Observable<any> {
    const url = `${this.apiUrl}create-new-task`;
    return this.http.post(url, task);
  }

  // Get a task by ID
  getTaskById(taskId: string): Observable<any> {
    const url = `${this.apiUrl}${taskId}`;
    return this.http.get(url);
  }

  // Delete a task
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${taskId}`;
    return this.http.delete(url);
  }

  // Update a task
  updateTask(task: any): Observable<any> {
  const taskId = task._id; 
  const updateUrl = `${this.apiUrl}update/${taskId}`; 
  console.log('Updating task with ID:', taskId);  
  return this.http.put(updateUrl, task); 
}

  
}
