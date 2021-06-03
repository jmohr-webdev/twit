import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { user }, logout }) => {
  const addDropdown = () => {
    Array.from(document.querySelectorAll('.nav-link')).forEach((link) => {
      link.classList.add('show');
      link.classList.remove('hide-on-small');
    });
  };

  const removeDropdown = () => {
    Array.from(document.querySelectorAll('.nav-link')).forEach((link) => {
      link.classList.remove('show');
      link.classList.add('hide-on-small');
    });
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 576) {
      removeDropdown();
    } else {
      document.getElementById('dropdown-nav').classList.remove('dropdown-nav');
      removeDropdown();
    }
  });

  const handleClick = () => {
    if (
      document.getElementById('dropdown-nav').classList.contains('dropdown-nav')
    ) {
      document.getElementById('dropdown-nav').classList.remove('dropdown-nav');
      removeDropdown();
    } else if (window.innerWidth < 576) {
      document.getElementById('dropdown-nav').classList.add('dropdown-nav');
      addDropdown();
    }
  };

  return (
    <header className="navbar navbar-auth">
      <Link to="/">
        <span className="brand">Twit</span>
      </Link>
      <i className="fas fa-bars fa-2x hide-on-large" onClick={handleClick}></i>
      <ul className="nav nav-links" id="dropdown-nav">
        <li className="nav-link hide-on-small">
          <NavLink
            exact
            to="/"
            onClick={handleClick}
            activeStyle={{ fontWeight: '600', color: '#fff' }}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-link hide-on-small">
          <NavLink
            to="/following"
            onClick={handleClick}
            activeStyle={{ fontWeight: '600', color: '#fff' }}
          >
            Following
          </NavLink>
        </li>
        <li className="nav-link hide-on-small">
          <NavLink
            to={`${user ? user.username : '/'}`}
            onClick={handleClick}
            activeStyle={{ fontWeight: '600', color: '#fff' }}
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-link hide-on-small">
          <NavLink to="/login" onClick={logout}>
            Log Out
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
