import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { loginUser } from '../redux/authSlice';
import { validateEmail, validatePassword } from '../utils/validationUtils';
import FormInput from '../components/FormInput';
import '../styles/Auth.css';

interface LocationState {
  message?: string;
}

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector(state => state.auth);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.message) {
      setSuccessMessage(state.message);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const validateForm = (): boolean => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    
    const newErrors = {
      email: emailError,
      password: passwordError
    };
    
    setErrors(newErrors);
    return !emailError && !passwordError;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setSuccessMessage(null);
    
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log In</h2>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <FormInput
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            label="Email"
            error={errors.email}
          />
          
          <FormInput
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            error={errors.password}
          />
          
          {error && <div className="server-error">{error}</div>}
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          
          <div className="auth-links">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}