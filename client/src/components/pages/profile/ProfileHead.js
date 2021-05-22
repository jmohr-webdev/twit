import React from 'react';
import PropTypes from 'prop-types';

const ProfileHead = ({ profile, username }) => {
  return (
    <div className="profile-head">
      <h1>{username}</h1>
    </div>
  );
};

ProfileHead.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileHead;
