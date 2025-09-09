import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore' },
    { name: 'Create', path: '/create' },
    { name: 'Contributions', path: '/contributions' },
    { name: 'Message', path: '/message' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.name} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="profile-icon" onClick={() => navigate('/profile')} title="Profile">
        <span>👤</span>
      </div>
    </nav>
  );
}

export default Navbar;
