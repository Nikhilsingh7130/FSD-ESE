import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



  return (
    <div className="App">
      <div className="main-dashboard-content" style={{ padding: '2rem' }}>
        {!user ? (
          <div className="home-section">
            <h2>Welcome to Complaint Management System</h2>
            <p>File and track complaints with AI-powered analysis</p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/login')} className="cta-btn login-btn">Login</button>
              <button onClick={() => navigate('/register')} className="cta-btn register-btn">Register</button>
            </div>
          </div>
        ) : (
          <div className="dashboard-section">
            <h2>Dashboard</h2>
            <div className="quick-actions">
              <div className="action-card" onClick={() => navigate('/complaints')}>
                <h3>📋 View Complaints</h3>
                <p>Track all your complaints</p>
              </div>
              <div className="action-card" onClick={() => navigate('/file-complaint')}>
                <h3>📝 File Complaint</h3>
                <p>Submit a new complaint</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
