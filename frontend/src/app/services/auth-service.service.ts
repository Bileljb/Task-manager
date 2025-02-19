import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  /** Sign Up */
  signUp(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      catchError(this.handleError)
    );
  }

  /** Login */
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError)
    );
  }

  /** Email Verification */
  verifyEmail(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-email`, { code }).pipe(
      catchError(this.handleError)
    );
  }

  /** Check if User is Authenticated */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /** Get Token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Get Authenticated User */
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /** Handle HTTP Errors */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error?.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
