// src/components/Navbar.jsx
// Updated Navbar component to include an image logo.

import { Link, NavLink } from 'react-router-dom';
import React from 'react'; // React is needed for JSX
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="src/assets/ images/Reservelt-Logo.png"
            alt="Reservelt Logo"
            className="logo-image"
    
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'src/assets/ images/Reservelt-Logo.png'; // Fallback image
            }}
          />
          <span className="logo-text">Reservelt</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
            >
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/rooms"
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
            >
              Rooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;