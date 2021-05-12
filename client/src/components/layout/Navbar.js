import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, user } }) => {
  const loggedInLinks = (
    <ul className="nav nav-links">
      <li>
        <Link to="/twits">
          <span className="nav-link">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/dash">
          <span className="nav-link">{user && user.username}</span>}
        </Link>
      </li>
      <li>
        <Link to="/logout">
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
      <Link to="/twits">
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

export default connect(mapStateToProps, null)(Navbar);
