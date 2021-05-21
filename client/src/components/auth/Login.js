import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const { usernameOrEmail, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ usernameOrEmail, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form action="submit" className="login-form">
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="usernameOrEmail"
            id="login-usernameOrEmail"
            minLength="6"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            id="login-password"
            maxLength="30"
            minLength="6"
            placeholder="Enter password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className="btn login"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
      <p className="signup-text">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
