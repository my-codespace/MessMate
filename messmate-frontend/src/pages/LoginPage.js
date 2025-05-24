import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove('faded-bg');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password
      });
      login(res.data);
      navigate(`/${res.data.role}`);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-bg-wrapper">
      <div className="auth-bg">
        <div className="app-title">
          <span role="img" aria-label="mess">🍽️</span> MessMate
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <button className="link-btn" onClick={() => navigate('/register')}>Register</button>
        </p>
      </div>
    </div>
  );
}
