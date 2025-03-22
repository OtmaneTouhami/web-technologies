import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return this.http
      .get<any[]>(`${this.apiUrl}/users?username=${username}`)
      .pipe(
        map((users) => {
          const user = users[0];
          if (user && user.password === hashedPassword) {
            localStorage.setItem('token', 'loggedIn');
            return user;
          }
          throw new Error('Invalid credentials');
        }),
        catchError((error) => throwError(() => new Error('Login failed')))
      );
  }

  signup(username: string, password: string): Observable<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return this.http
      .post(`${this.apiUrl}/users`, {
        username,
        password: hashedPassword,
      })
      .pipe(
        catchError((error) => throwError(() => new Error('Signup failed')))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
