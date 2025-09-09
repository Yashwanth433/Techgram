import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="fullscreen">
      <div className="overlay"></div>
      <div className="start-container">
        <h1>Welcome to My App</h1>
        <button onClick={() => navigate('/login')}>Get Started</button>
        <p>Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  );
}

export default StartPage;
