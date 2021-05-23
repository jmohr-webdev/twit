import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileButton from './ProfileButton';

const ProfileHead = ({ profile, isAuthenticated }) => {
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
          <div className="details-background">
            <p className="details-bio">
              Bio: {bio ? bio : 'No biography given'}{' '}
            </p>
            <p className="details-location">
              Location: {location ? location : 'No location given'}{' '}
            </p>
          </div>
          {isAuthenticated && <ProfileButton profile={profile} />}
        </div>
      </div>
    </div>
  );
};

ProfileHead.propTypes = {
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProfileHead);
