import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="layout">
      {!isAuthPage && (
        <header className="layout-header">
          <div className="header-container">
            <div className="logo" onClick={() => navigate('/')}>
              <h1>🔧 Complaint Manager</h1>
            </div>
            
            <nav className="nav-menu">
              {user ? (
                <>
                  <span className="user-info">👤 {user.name}</span>
                  <button onClick={() => navigate('/')} className="nav-item">Dashboard</button>
                  <button onClick={() => navigate('/complaints')} className="nav-item">My Complaints</button>
                  <button onClick={() => navigate('/file-complaint')} className="nav-item primary">📝 File Complaint</button>
                  <button onClick={handleLogout} className="nav-item logout">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="nav-item">Login</button>
                  <button onClick={() => navigate('/register')} className="nav-item primary">Register</button>
                </>
              )}
            </nav>
          </div>
        </header>
      )}
      
      <main className={isAuthPage ? 'main-auth' : 'main-content'}>
        {children}
      </main>

      {!isAuthPage && (
        <footer className="layout-footer">
          <p>&copy; 2026 AI Complaint Management System | All Rights Reserved</p>
        </footer>
      )}
    </div>
  );
}

export default Layout;
