import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { registerUser } from '../api';

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    if (!username.trim()) {
      setMsg('Username cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setMsg('Password cannot be empty.');
      return;
    }
    try {
      const res = await registerUser({ username, password });
      setMsg(res.data.message);
      if(res.data.success) navigate('/login');
    } catch(err) {
      setMsg('Error connecting to server');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="reg-username">Username</label>
          <input
            id="reg-username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Choose a password"
          />
        </div>
        <button className="btn" onClick={handleRegister}>Register</button>
        <div className={`message ${msg.includes('successful') ? 'success' : msg ? 'error' : ''}`}>
          {msg}
        </div>
        <p>Already have an account? <span className="link" onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  );
}

export default RegisterPage;
