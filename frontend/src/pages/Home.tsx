import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';
import '../styles/Home.css';

export default function Home(): JSX.Element {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <h2>User Auth App</h2>
        </div>
        <nav className="main-nav">
          {isAuthenticated ? (
            <>
              <Link to='/dashboard' className="nav-link">Dashboard</Link>
              <Link to='/profile' className="nav-link">Profile</Link>
            </>
          ) : (
            <>
              <Link to='/login' className="nav-btn primary">Login</Link>
              <Link to='/register' className="nav-btn secondary">Register</Link>
            </>
          )}
        </nav>
      </header>
      
      <main className="hero-section">
        
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Authentication</h3>
            <p>End-to-end encryption and industry standard security practices</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast & Responsive</h3>
            <p>Works seamlessly on all devices and screen sizes</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>User Profiles</h3>
            <p>Customizable user profiles with personal information</p>
          </div>
        </div>
      </main>
      
      <footer className="home-footer">
        <p>&copy; 2025 User Auth App. All rights reserved.</p>
      </footer>
    </div>
  );
}