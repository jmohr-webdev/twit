import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileHead = ({ profile, user }) => {
  const { username, bio, location, name } = profile;

  return (
    <div className="profile-head">
      <div className="profile-container">
        <div className="avatar-container">
          <i className="fas fa-user-circle fa-8x"></i>
        </div>
        <div className="details-container">
          <div className="details-name">
            <h1>{name ? name : username}</h1>
            <p className="details-username">@{username}</p>
          </div>
          <div className="details-backgrosund">
            <p className="details-bio">
              Bio: {bio ? bio : 'No biography given'}{' '}
            </p>
            <p className="details-location">
              Location: {location ? location : 'No location given'}{' '}
            </p>
          </div>
          {user && user.isAuthenticated && (
            <button className="btn btn-follow">Follow</button>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileHead.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ProfileHead);
