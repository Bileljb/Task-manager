import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  apiUrl = 'http://localhost:5000/api/tasks/'; 

  constructor(private http: HttpClient) {}

  // Fetch all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Create a new task
  createTask(task: any): Observable<any> {
    // const token = localStorage.getItem('token'); 
    // if (!token) {
    //   console.error('No token found');
    //   return new Observable();
    // }

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`, 
    // });
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
// drag and drop by the status of the task (e.g. 'Todo', 'In Progress', 'Completed')
updateTaskStatus(taskId: string, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${taskId}/status`, { status });
}

  
}
