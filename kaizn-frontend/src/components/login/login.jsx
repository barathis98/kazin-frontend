import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    const loginPayload = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`http://${process.env.REACT_APP_SERVER_IP}:8000/backend/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('userToken', data.token);
        navigate('/dashboard');
      } else if (response.status === 401) {
        setError('Invalid credentials');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}> {/* Disable button when loading */}
          {loading ? 'Logging in...' : 'Login'} {/* Change button text based on loading state */}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
