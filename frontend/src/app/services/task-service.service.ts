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

  // Get a task by ID
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update a task
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }
}
