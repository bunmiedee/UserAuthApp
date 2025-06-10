import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { logout } from '../redux/authSlice';
import '../styles/Navbar.css';

export default function Navbar(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const isAuthenticated = !!token;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          User Auth App
        </Link>
        
        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`menu-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <div className={`navbar-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <Link 
            to="/"
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-item ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`nav-item ${isActive('/register') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}