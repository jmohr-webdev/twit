import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileButton from './ProfileButton';
import ProfileAvatar from './ProfileAvatar';

const ProfileHead = ({ profile, user, isAuthenticated }) => {
  const [isCurrentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user.username) {
      setCurrentUser(profile.username === user.username);
    }
  }, [profile.username, isAuthenticated, user]);

  const { username, bio, location, name } = profile;

  return (
    <div className="profile-head">
      <div className="profile-container">
        <div className="avatar-container">
          <ProfileAvatar currentUser={isCurrentUser || false} />
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
          {isAuthenticated && (
            <ProfileButton currentUser={isCurrentUser || false} />
          )}
        </div>
      </div>
    </div>
  );
};

ProfileHead.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProfileHead);
