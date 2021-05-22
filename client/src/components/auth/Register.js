import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container auth">
      <div className="overlay auth">
        <form action="submit" className="signup-form">
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              id="signup-username"
              minLength="3"
              maxLength="16"
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              id="signup-email"
              minLength="6"
              placeholder="E-mail"
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              id="signup-password"
              maxLength="30"
              minLength="6"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="btn signup"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
