import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:5000/api/admin/'; 
  taskUrl = 'http://localhost:5000/api/tasks/';
  getEmployees(): Observable<{ success: boolean; message: string; employees: any[] }> {
    return this.http.get<{ success: boolean; message: string; employees: any[] }>(`${this.baseUrl}employees`);
  }

  getEmployeeById(employeeId: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}employee/${employeeId}`);
  }


}

 
