import React, { Fragment } from 'react';

const LoginForm = () => {
  return (
    <Fragment>
      <form action="submit" className="signup-form">
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="signup-username"
            id="signup-username"
            placeholder="Username"
          />
        </div>

        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="signup-email"
            id="signup-email"
            placeholder="E-mail"
          />
        </div>

        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="signup-password"
            id="signup-password"
            maxlength="30"
            minlength="6"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn signup">
          Sign Up
        </button>
      </form>
      <p className="login-text">
        Already have an account? <a href="#">Login.</a>
      </p>
    </Fragment>
  );
};

export default LoginForm;
