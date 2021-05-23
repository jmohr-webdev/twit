import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/follow';

const ProfileButton = ({ profile, user, unfollowUser, followUser }) => {
  const [isCurrentUser, setCurrentUser] = useState(false);
  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    const alreadyFollowed = alreadyFollowing(user.following, profile.username);
    setFollowing(alreadyFollowed !== undefined);

    setCurrentUser(user.username === profile.username);
  }, [profile.username, user.following, user.username]);

  const alreadyFollowing = (following, userToFollow) => {
    return following.find((follow) => follow.username === userToFollow);
  };

  // let currentUser = false;
  // let isFollowing = false;

  // if (user) {
  //   currentUser = user.username === profile.username;
  //   isFollowing =
  //     user.following.filter((follow) => follow.username === profile.username)
  //       .length > 0;
  // }

  return (
    <>
      {isCurrentUser && <button className="btn btn-edit">Edit Profile</button>}

      {!isCurrentUser && !isFollowing && (
        <button
          className="btn btn-follow"
          onClick={() => followUser(profile.username)}
        >
          Follow
        </button>
      )}

      {!isCurrentUser && isFollowing && (
        <button
          className="btn btn-unfollow"
          onClick={() => unfollowUser(profile.username)}
        >
          Unfollow
        </button>
      )}
    </>
  );
};

ProfileButton.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
  ProfileButton
);
