import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthenticatedTopbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const getActiveApp = () => {
    if (location.pathname.startsWith('/orchestrator')) return 'orchestrator';
    if (location.pathname.startsWith('/tamly')) return 'tamly';
    return 'home';
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
          Micro-Frontend Hub
        </Link>
        
        <div className="topbar-right">
          <nav className="nav-links">
            <Link 
              to="/" 
              className={getActiveApp() === 'home' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
            <Link 
              to="/orchestrator" 
              className={getActiveApp() === 'orchestrator' ? 'nav-link active' : 'nav-link'}
            >
              Orchestrator
            </Link>
            <Link 
              to="/tamly" 
              className={getActiveApp() === 'tamly' ? 'nav-link active' : 'nav-link'}
            >
              Tamly
            </Link>
          </nav>
          
          <div className="user-menu">
            <span className="user-email">{currentUser?.email}</span>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 