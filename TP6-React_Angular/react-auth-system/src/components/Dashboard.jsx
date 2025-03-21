import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import logo from "../assets/enset_logo.png";


function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <div className="header-bar" style={{ marginBottom: '2rem' }}>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="upload-section">
          <h2>Welcome to Dashboard</h2>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;