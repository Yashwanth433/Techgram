import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { loginUser } from '../api';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) {
      setMsg('Username cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setMsg('Password cannot be empty.');
      return;
    }
    try {
      const res = await loginUser({ username, password });
      if(res.data.success) {
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userId', res.data.userId);
        navigate('/home', { state: { user: res.data.username } });
      } else {
        setMsg(res.data.message);
      }
    } catch(err) {
      setMsg('Error connecting to server');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn" onClick={handleLogin}>Login</button>
        <div className={`message ${msg.includes('successful') ? 'success' : msg ? 'error' : ''}`}>
          {msg}
        </div>
        <p>Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  );
}

export default LoginPage;
