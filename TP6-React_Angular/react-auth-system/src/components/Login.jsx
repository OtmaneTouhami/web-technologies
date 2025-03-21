import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import logo from "../assets/enset_logo.png";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      localStorage.setItem('token', 'loggedIn');
      navigate('/dashboard');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Invalid username or password');
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
              <button className="btn btn-primary" type="submit">Sign In</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
              New User? <Link className="link-text" to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;