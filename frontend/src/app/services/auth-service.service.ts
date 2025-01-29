import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
    );
  }
}
