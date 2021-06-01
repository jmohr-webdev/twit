import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getFollowing,
  followUser,
  unfollowUser,
} from '../../../actions/follow';
import { toggleProfileModal } from '../../../actions/modal';

const ProfileButton = ({
  profile,
  user,
  getFollowing,
  unfollowUser,
  followUser,
  following,
  toggleProfileModal,
  profileModalOpen,
}) => {
  const [isCurrentUser, setCurrentUser] = useState(false);
  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    getFollowing(user.username);
    setCurrentUser(profile.username === user.username);
    setFollowing(
      following.find((follow) => follow.username === profile.username)
    );
  }, [user.username, profile.username, getFollowing]);

  return (
    <>
      {isCurrentUser && (
        <button className="btn btn-edit" onClick={toggleProfileModal}>
          Edit Profile
        </button>
      )}

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
  toggleProfileModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  following: state.follow.following,
  profileModalOpen: state.modal.profileModalOpen,
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  getFollowing,
  toggleProfileModal,
})(ProfileButton);
