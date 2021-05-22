import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileButton = ({ profile, user }) => {
  let currentUser = false;
  let isFollowing = false;

  if (user) {
    currentUser = user.username === profile.username;
    isFollowing =
      user.following.filter((follow) => follow.username === profile.username)
        .length > 0;
  }

  return (
    <>
      {currentUser && <button className="btn btn-edit">Edit Profile</button>}

      {!currentUser && !isFollowing && (
        <button className="btn btn-follow">Follow</button>
      )}

      {!currentUser && isFollowing && (
        <button className="btn btn-unfollow">Unfollow</button>
      )}
    </>
  );
};

ProfileButton.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProfileButton);
