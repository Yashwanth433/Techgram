import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if(!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome {user}</h1>
        <p>Login successful! You are now on the Home Page.</p>
      </div>
    </div>
  );
}

export default HomePage;
