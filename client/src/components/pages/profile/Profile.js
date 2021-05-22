import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/profile';
import ProfileHead from './ProfileHead';
import ModalPostButton from '../../layout/ModalPostButton';
import Modal from '../../layout/Modal';
import Twit from '../../twits/Twit';

const Profile = ({
  match,
  getProfile,
  twits,
  profile,
  isAuthenticated,
  modalOpen,
}) => {
  useEffect(() => {
    getProfile(match.params.username);
  }, [getProfile, match.params.username]);

  return (
    <>
      <ProfileHead profile={profile} />

      {twits ? (
        <>
          <div className="twits-container profile">
            {twits.map((twit) => (
              <Twit twit={twit} key={twit._id} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>No twits</h1>
        </div>
      )}

      {isAuthenticated && (
        <>
          <ModalPostButton />
          {modalOpen && <Modal />}
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  twits: PropTypes.array,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  profile: state.profile.profile,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProfile })(Profile);
