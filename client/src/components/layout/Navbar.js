import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const loggedInLinks = (
    <ul className="nav nav-links">
      <li>
        <NavLink
          exact
          to="/"
          activeStyle={{ fontWeight: '600', color: '#fff' }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/following"
          activeStyle={{ fontWeight: '600', color: '#fff' }}
        >
          Following
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${user ? user.username : '/'}`}
          activeStyle={{ fontWeight: '600', color: '#fff' }}
        >
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink onClick={logout} to="/login">
          Log Out
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav nav-links">
      <li>
        <NavLink
          to="/register"
          activeStyle={{ fontWeight: '600', color: '#fff' }}
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeStyle={{ fontWeight: '600', color: '#fff' }}>
          Log In
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className="navbar navbar-auth">
      <Link to="/">
        <span className="brand">Twit</span>
      </Link>
      <Fragment>{isAuthenticated ? loggedInLinks : guestLinks}</Fragment>
    </header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
