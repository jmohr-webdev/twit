import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const loggedInLinks = (
    <ul className="nav nav-links">
      <li>
        <Link to="/">
          <span className="nav-link">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/following">
          <span className="nav-link">Following</span>}
        </Link>
      </li>
      <li>
        <Link to={`${user ? user.username : '/'}`}>
          <span className="nav-link">Profile</span>}
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <span className="nav-link">Log Out</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav nav-links">
      <li>
        <Link to="/register">
          <span className="nav-link">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span className="nav-link">Log In</span>
        </Link>
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
