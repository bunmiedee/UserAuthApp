import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAppDispatch } from '../utils/hooks';
import { logout } from '../redux/authSlice';
import '../styles/Dashboard.css';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<User>('/user')
      .then(res => setUser(res.data))
      .catch(() => setError('Failed to fetch user details'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Log Out</button>
      </header>

      <div className="dashboard-content">
        {user ? (
          <div className="user-profile">
            <div className="avatar">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <h3>Welcome, {user.firstName} {user.lastName}</h3>
            <p className="user-email">{user.email}</p>
            
            <div className="dashboard-actions">
              <button className="profile-btn">Edit Profile</button>
              <button className="settings-btn">Settings</button>
            </div>
          </div>
        ) : (
          <div className="dashboard-error">
            <p>{error}</p>
            <button onClick={() => navigate('/login')} className="retry-btn">
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}