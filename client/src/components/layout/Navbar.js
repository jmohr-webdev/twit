import React from 'react';
import { connect } from 'react-redux';
import GuestNavbar from './GuestNavbar';
import AuthNavbar from './AuthNavbar';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  return <>{isAuthenticated ? <AuthNavbar /> : <GuestNavbar />}</>;
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
