import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import logo from "../assets/enset_logo.png";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(username, password);
      localStorage.setItem('token', 'loggedIn');
      navigate('/dashboard');
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
              <button className="btn btn-primary" type="submit">Create Account</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              Already registered? <Link className="link-text" to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;