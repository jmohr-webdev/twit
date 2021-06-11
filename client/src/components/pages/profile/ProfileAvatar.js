import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const ProfileAvatar = ({ profile, auth }) => {
  const hasAvatar = (
    <img
      className="profile-avatar"
      alt={`${profile.username}-avatar`}
      src={`/img/avatars/${profile.avatar}`}
    />
  );

  const noAvatar = <i className="fas fa-user-circle fa-8x"></i>;

  return (
    <div className="avatar-container">
      {profile.avatar ? hasAvatar : noAvatar}
    </div>
  );
};

ProfileAvatar.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(ProfileAvatar);
