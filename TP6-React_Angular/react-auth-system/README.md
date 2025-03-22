# React Authentication System

This project is a comprehensive React-based authentication system featuring secure user registration, login functionality, and protected routes. It was developed as part of the Web Technologies course laboratory at ENSET ElMohammadia.

## 📋 Overview

This application demonstrates a full implementation of frontend authentication workflows with a React frontend and JSON Server backend. It showcases:

- User registration with password validation and confirmation
- Secure authentication with SHA-256 password hashing
- Protected routes accessible only to authenticated users
- Modern, responsive UI with automatic dark mode support
- Session persistence using localStorage

## 🛠️ Technologies Used

- **React**: v19.0.0 - Core UI library
- **React Router DOM**: v7.4.0 - Client-side routing
- **Axios**: v1.8.4 - HTTP client for API requests
- **CryptoJS**: v4.2.0 - Cryptographic functions for password hashing
- **JSON Server**: v1.0.0-beta.3 - Mock REST API backend
- **Vite**: v6.2.2 - Frontend build tool
- **ESLint**: v9.21.0 - Code quality and consistency

## 📁 Project Structure

```
react-auth-system/
├── .gitignore                # Git ignore configuration
├── db.json                   # JSON Server database with user records
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── vite.config.js            # Vite bundler configuration
├── public/                   # Public assets
└── src/
    ├── App.css               # Application styles
    ├── App.jsx               # Main component with routing
    ├── main.jsx              # React entry point
    ├── api/
    │   └── auth.js           # Authentication API services
    ├── assets/
    │   └── enset_logo.png    # ENSET logo image
    └── components/
        ├── Dashboard.jsx     # Protected dashboard component
        ├── Login.jsx         # User login component
        ├── ProtectedRoute.jsx # Route protection wrapper
        └── Signup.jsx        # User registration component
```

## 🛂 Authentication Implementation

### Core Routing with Protected Routes

The application uses React Router to manage navigation and protect routes from unauthorized access.

`App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Protection Mechanism for Authenticated Routes

`ProtectedRoute.jsx` implements a simple but effective way to restrict access to authenticated users:

```jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
```

This component:

- Checks for the presence of a token in localStorage
- If present, renders child routes using Outlet
- If absent, redirects to the login page

## 📝 Authentication Components

### Login Component

`Login.jsx` provides a complete login form with validation and error handling:

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import logo from "../assets/enset_logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      localStorage.setItem("token", "loggedIn");
      navigate("/dashboard");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-section">
        <div className="brand-content">
          <img src={logo} alt="ENSET Logo" className="brand-logo" />
          <h1>ENSET</h1>
          <p>École Normale Supérieure de l'Enseignement Technique</p>
        </div>
      </div>

      <div className="form-section">
        <div className="auth-card">
          <div className="form-header">
            <img src={logo} alt="ENSET Logo" className="brand-logo" />
            <h2>User Login</h2>
          </div>
          <div className="form-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                {error && <p className="error-message">{error}</p>}
                <br />
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Sign In
              </button>
            </form>
            <p style={{ marginTop: "1rem" }}>
              New User?{" "}
              <Link className="link-text" to="/signup">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

Key features:

- Form state management with React hooks
- Form submission handling with API integration
- Error handling and display
- Navigation after successful login
- Link to signup for new users

### Signup Component

`Signup.jsx` handles new user registration with password validation:

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import logo from "../assets/enset_logo.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(username, password);
      localStorage.setItem("token", "loggedIn");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-section">
        <div className="brand-content">
          <img src={logo} alt="ENSET Logo" className="brand-logo" />
          <h1>ENSET</h1>
          <p>École Normale Supérieure de l'Enseignement Technique</p>
        </div>
      </div>

      <div className="form-section">
        <div className="auth-card">
          <div className="form-header">
            <img src={logo} alt="ENSET Logo" className="brand-logo" />
            <h2>Create New Account</h2>
          </div>
          <div className="form-body">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Create Account
              </button>
            </form>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
              Already registered?{" "}
              <Link className="link-text" to="/login">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
```

Key features:

- Additional password confirmation field
- Password matching validation
- User-friendly error messages
- Navigation to dashboard upon successful registration

### Dashboard Component

`Dashboard.jsx` provides the protected area for authenticated users:

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import logo from "../assets/enset_logo.png";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="ENSET Logo" className="brand-logo" />
        </div>
        <ul className="sidebar-nav">
          <li className="nav-item active">Dashboard</li>
          <li className="nav-item">Products</li>
          <li className="nav-item">Upload File</li>
          <li className="nav-item">Settings</li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="header-bar" style={{ marginBottom: "2rem" }}>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="upload-section">
          <h2>Welcome to Dashboard</h2>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
```

Key features:

- Sidebar navigation with dummy menu items
- Logout functionality with navigation
- Simple welcome content area
- Responsive layout that adapts to different screen sizes

## 🔑 Authentication API Services

The `auth.js` file implements all backend communication:

```javascript
import axios from "axios";
import CryptoJS from "crypto-js";

export const login = async (username, password) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users?username=${username}`
    );
    const user = response.data[0];
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (!user || user.password !== hashedPassword) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = async (username, password) => {
  try {
    const checkUser = await axios.get(
      `http://localhost:3001/users?username=${username}`
    );
    if (checkUser.data.length > 0) {
      throw new Error("Username already exists");
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    await axios.post("http://localhost:3001/users", {
      username,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error("Signup failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
```

This module provides:

- **Login**: Authenticates users by comparing hashed passwords
- **Signup**: Creates new users after checking for existing usernames
- **Logout**: Removes the authentication token from localStorage

Security features:

- Password hashing using SHA-256
- Username uniqueness validation
- Error handling for failed requests

## 🎨 Styling Implementation

The application includes comprehensive styling in `App.css` that provides:

1. **Modern UI Design**

   - Clean card-based layout
   - Gradient backgrounds
   - Subtle shadows and transitions

2. **Responsive Layouts**

   - Flexible containers that adapt to different screen sizes
   - Mobile-friendly navigation
   - Appropriate spacing and font sizing

3. **Dark Mode Support**

   - Automatic theme switching based on system preferences
   - Dark color palette that reduces eye strain
   - Consistent theming across components

4. **Form Styling**
   - Consistent input fields with focus states
   - Clear button styling with hover effects
   - Proper error message presentation

Example of responsive styling:

```css
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

  .sidebar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .nav-item {
    flex: 0 0 auto;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .main-content {
    padding: 1rem;
    height: calc(100vh - 180px);
  }
}
```

Example of dark mode implementation:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f3f4f6;
    --light-gray: #2a2d3e;
  }

  body {
    background: #121212;
  }

  .form-section,
  .auth-card,
  .sidebar,
  .upload-section {
    background: #1e1e24;
  }

  .form-input {
    background-color: #2a2a36;
    color: #f3f4f6;
    border-color: #3a3a48;
  }

  .error-message {
    background: rgba(220, 38, 38, 0.2);
  }
}
```

## 🗄️ Backend Implementation

The application uses JSON Server to provide a simple REST API backend. The db.json file stores user data:

```json
{
  "users": [
    {
      "id": "22b8",
      "username": "test",
      "password": "f2e2b060bcf30081c4afa04118dd60271d5515b92516096a263b43f410703f0d"
    }
  ]
}
```

Security considerations:

- Passwords are stored as SHA-256 hashes, not in plaintext
- User IDs are generated automatically by JSON Server
- In a production environment, this would be replaced by a secure backend with proper JWT authentication

## 🚀 Getting Started

### Prerequisites

- Node.js v16.0.0 or higher
- npm v8.0.0 or higher

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/OtmaneTouhami/web-technologies.git
   cd TP6-React_Angular/react-auth-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the JSON Server backend:

   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. In a new terminal, start the React development server:

   ```bash
   npm run dev
   ```

5. Open your browser at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

## 🎓 Academic Context

This project was developed as a laboratory exercise for the Web Technologies course at École Normale Supérieure de l'Enseignement Technique (ENSET) ElMohammadia. The exercise demonstrates:

- Modern React development practices using functional components and hooks
- Secure authentication patterns and password handling
- Frontend routing and protected routes
- User interface design principles for authentication systems
- State management in React applications
- API integration with backend services

The project provides hands-on experience with practical web development concepts that are widely used in industry applications.

## 🔍 Learning Outcomes

Through this project, students learn:

1. **React Component Architecture**

   - Building reusable and maintainable components
   - Component lifecycle and state management
   - Inter-component communication

2. **Authentication Fundamentals**

   - User registration and login flows
   - Password security best practices
   - Protected route implementation
   - Session management

3. **Modern UI/UX Design**

   - Responsive layout implementation
   - Dark mode and accessibility considerations
   - Form design and validation patterns

4. **API Integration**
   - HTTP request handling with Axios
   - Error handling and user feedback
   - Data transformation and processing

## 🔮 Future Enhancements

Potential improvements for future iterations:

1. **Enhanced Security**

   - JWT authentication with refresh tokens
   - Role-based authorization
   - Account lockout after failed attempts
   - Password complexity requirements

2. **Additional Features**

   - Email verification
   - Password reset functionality
   - User profile management
   - Remember me functionality
   - Social media authentication options

3. **Technical Improvements**
   - Implement TypeScript for type safety
   - Add comprehensive unit and integration tests
   - Implement state management with Redux or Context API
   - Deploy with CI/CD pipeline

## 📝 License

This project is open-source, created for educational purposes as part of the Web Technologies curriculum at ENSET ElMohammadia.# ENSET Authentication System

This project is a comprehensive React-based authentication system featuring secure user registration, login functionality, and protected routes. It was developed as part of the Web Technologies course laboratory at ENSET ElMohammadia.
