import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  private employees = 'http://localhost:5000/api/admin/employees'; 
  getEmployees(): Observable<{ success: boolean; message: string; employees: any[] }> {
    return this.http.get<{ success: boolean; message: string; employees: any[] }>(this.employees);
  }
  
  

}
