import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/follow';

const ProfileButton = ({
  match,
  profile,
  user,
  unfollowUser,
  followUser,
  following,
}) => {
  const [isCurrentUser, setCurrentUser] = useState(false);

  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    const alreadyFollowed = alreadyFollowing(following, profile.username);

    setCurrentUser(user.username === profile.username);
    setFollowing(alreadyFollowed !== undefined);
  }, [
    setFollowing,
    setCurrentUser,
    profile.username,
    following,
    user.username,
  ]);

  const alreadyFollowing = (following, userToFollow) => {
    return following.find((follow) => follow.username === userToFollow);
  };

  return (
    <>
      {isCurrentUser && <button className="btn btn-edit">Edit Profile</button>}

      {!isCurrentUser && !isFollowing && (
        <button
          className="btn btn-follow"
          onClick={() => {
            setFollowing(true);
            followUser(profile.username);
          }}
        >
          Follow
        </button>
      )}

      {!isCurrentUser && isFollowing && (
        <button
          className="btn btn-unfollow"
          onClick={() => {
            setFollowing(false);
            unfollowUser(profile.username);
          }}
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
  following: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  following: state.auth.user.following,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
  ProfileButton
);
