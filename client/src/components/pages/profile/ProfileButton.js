import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  followUser,
  unfollowUser,
  getFollowing,
} from '../../../actions/follow';
import { toggleProfileModal } from '../../../actions/modal';

const ProfileButton = ({
  user,
  profile,
  following,
  getFollowing,
  currentUser,
  followUser,
  unfollowUser,
  toggleProfileModal,
}) => {
  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    getFollowing(user.username);
    setFollowing(
      following.find((follow) => follow.username === profile.username)
    );
  }, [user.username, profile.username]);

  return (
    <>
      {currentUser && (
        <button className="btn btn-edit" onClick={toggleProfileModal}>
          Edit Profile
        </button>
      )}

      {!currentUser && !isFollowing && (
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

      {!currentUser && isFollowing && (
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
  currentUser: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  toggleProfileModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
  following: state.follow.following,
  profileModalOpen: state.modal.profileModalOpen,
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  getFollowing,
  toggleProfileModal,
})(ProfileButton);
