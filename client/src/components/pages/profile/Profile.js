import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/profile';
import ProfileHead from './ProfileHead';
import ModalPostButton from '../../layout/ModalPostButton';
import PostModal from '../../layout/PostModal';
import ProfileEditModal from './ProfileEditModal';
import Twit from '../../twits/Twit';

const Profile = ({
  match,
  getProfile,
  twits,
  profile,
  isAuthenticated,
  modalOpen,
  profileModalOpen,
}) => {
  useEffect(() => {
    getProfile(match.params.username);
  }, [getProfile, match.params.username, profile]);

  return (
    <>
      <ProfileHead profile={profile} />

      {twits.length > 0 ? (
        <>
          <div className="twits-container">
            {twits.map((twit) => (
              <Twit twit={twit} key={twit._id} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-twits-container profile">
          <h1 className="no-twits-content">
            This user hasn't twitted anything yet.
          </h1>
        </div>
      )}

      {isAuthenticated && (
        <>
          <ModalPostButton />
          {modalOpen && <PostModal />}
        </>
      )}

      {profileModalOpen && <ProfileEditModal />}
    </>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  twits: PropTypes.array,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  modalOpen: PropTypes.bool,
  profileModalOpen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  profile: state.profile.profile,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
  profileModalOpen: state.modal.profileModalOpen,
});

export default connect(mapStateToProps, { getProfile })(Profile);
