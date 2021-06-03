import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const GuestNavbar = () => {
  return (
    <header className="navbar navbar-auth">
      <Link to="/">
        <span className="brand">Twit</span>
      </Link>
      <ul className="nav guest nav-links">
        <li className="nav-link">
          <NavLink
            to="/register"
            activeStyle={{ fontWeight: '600', color: '#fff' }}
          >
            Register
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink
            to="/login"
            activeStyle={{ fontWeight: '600', color: '#fff' }}
          >
            Log In
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default GuestNavbar;
