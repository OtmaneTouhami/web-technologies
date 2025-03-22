# Angular Authentication System

## Course Context

This project is part of the Web Technologies course laboratory work at ENSET El Mohammadia (École Normale Supérieure de l'Enseignement Technique), Mohammedia, Morocco. It serves as a practical application of modern web development concepts using Angular.

## Educational Objectives

- Implement a complete authentication system with Angular
- Master Angular's reactive forms and validation
- Apply route protection with Guards
- Implement proper state management
- Create responsive interfaces with modern CSS
- Understand the authentication flow and security best practices

## Overview

The Angular Authentication System demonstrates a complete authentication solution built with Angular. It provides user registration, login functionality, and protected routes with a clean, responsive UI. The application demonstrates best practices for authentication, form validation, and secure routing in modern Angular applications.

## Features

- User registration with password validation
- Secure login with password hashing
- Protected dashboard accessible only to authenticated users
- Responsive design for desktop and mobile devices
- Form validation with error messages
- Token-based authentication

## Technology Stack

- **Frontend**: Angular 19.2
- **Form Management**: Angular Reactive Forms
- **Routing**: Angular Router with Guards
- **HTTP Communication**: Angular HttpClient
- **Password Security**: CryptoJS (SHA-256 hashing)
- **Backend**: JSON Server (mock REST API)
- **Styling**: Custom CSS with responsive design
- **Package Manager**: npm

## Application Components

### Auth Components

#### Login Component

- Handles user authentication
- Manages login form with validation
- Displays error messages for invalid credentials
- Redirects to dashboard upon successful login

**Code Example - Login Form Implementation:**

```typescript
// src/app/components/login/login.component.ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => this.router.navigate(["/dashboard"]),
        error: () => (this.errorMessage = "Invalid username or password"),
      });
    }
  }
}
```

#### Signup Component

- Manages user registration
- Implements password validation and confirmation
- Provides real-time form validation feedback
- Redirects to login upon successful registration

**Code Example - Password Validation:**

```typescript
// src/app/components/signup/signup.component.ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        username: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get("password")?.value === form.get("confirmPassword")?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;
      this.authService.signup(username, password).subscribe({
        next: () => {
          this.router.navigate(["/login"]);
        },
        error: () => (this.errorMessage = "Registration failed. Please try again."),
      });
    }
  }
}
```

### Dashboard Component

- Protected by AuthGuard
- Displays user interface after successful login
- Contains navigation sidebar
- Provides logout functionality

**Code Example - Dashboard Implementation:**

```typescript
// src/app/components/dashboard/dashboard.component.ts
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: [],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
```

### Services

#### AuthService

- Manages authentication state
- Handles login, signup, and logout functionality
- Communicates with the backend API
- Stores and retrieves authentication tokens
- Provides methods to check authentication status

**Code Example - Authentication Service:**

```typescript
// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return this.http.get<any[]>(`${this.apiUrl}/users?username=${username}`).pipe(
      map((users) => {
        const user = users[0];
        if (user && user.password === hashedPassword) {
          localStorage.setItem("token", "loggedIn");
          return user;
        }
        throw new Error("Invalid credentials");
      }),
      catchError((error) => throwError(() => new Error("Login failed")))
    );
  }

  signup(username: string, password: string): Observable<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return this.http
      .post(`${this.apiUrl}/users`, {
        username,
        password: hashedPassword,
      })
      .pipe(catchError((error) => throwError(() => new Error("Signup failed"))));
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}
```

### Guards

#### AuthGuard

- Protects routes from unauthorized access
- Redirects unauthenticated users to the login page
- Works with the AuthService to check authentication status

**Code Example - Route Guard Implementation:**

```typescript
// src/app/auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
```

## Responsive Design Features

The application includes a fully responsive design that adapts to different screen sizes:

```css
/* Mobile Responsiveness */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .brand-section {
    padding: 1.5rem;
    min-height: 150px;
    flex: 0 0 auto;
  }

  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 180px;
    position: relative;
    padding: 0.75rem;
  }
}
```

## Form Validation

Angular Reactive Forms provide real-time validation with custom error messages:

```html
<div *ngIf="loginForm.get('username')?.invalid && (loginForm.get('username')?.touched || submitted)" class="error-message">
  <span *ngIf="loginForm.get('username')?.errors?.['required']"> Username is required </span>
</div>
```

## Project Structure

```
angular-auth-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.ts
│   │   │   ├── signup/
│   │   │   │   ├── signup.component.html
│   │   │   │   ├── signup.component.css
│   │   │   │   └── signup.component.ts
│   │   │   └── dashboard/
│   │   │       ├── dashboard.component.html
│   │   │       └── dashboard.component.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── auth.guard.ts
│   ├── assets/
│   │   └── enset_logo.png
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── db.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Start the JSON server for the mock API:

```
npx json-server --watch db.json --port 3001
```

4. Start the Angular application:

```
ng serve
```

5. Navigate to `http://localhost:4200` in your browser

## Authentication Flow

1. User registers via the signup form
2. Password is hashed with SHA-256 before being sent to the server
3. User logs in via the login form
4. System verifies credentials and provides an authentication token
5. Token is stored in localStorage for persistent sessions
6. Protected routes check for valid token before allowing access
7. User can logout, which removes the token

## Learning Outcomes

Through this laboratory work, students gain hands-on experience with:

- Angular architecture and component design
- Authentication patterns and security considerations
- Reactive form implementation and validation
- Angular routing and navigation
- State management strategies
- Responsive design techniques

This project demonstrates proficiency in building secure, user-friendly web applications with modern Angular practices.# Angular Authentication System
