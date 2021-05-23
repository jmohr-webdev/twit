import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/profile';
import ProfileHead from './ProfileHead';
import ModalPostButton from '../../layout/ModalPostButton';
import Modal from '../../layout/Modal';
import Twit from '../../twits/Twit';
import NoTwits from '../../twits/NoTwits';

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

      {twits.length > 0 ? (
        <>
          <div className="twits-container">
            {twits.map((twit) => (
              <Twit twit={twit} key={twit._id} />
            ))}
          </div>
        </>
      ) : (
        <NoTwits msg={`This user hasn't twitted anything yet.`} />
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
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  modalOpen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  profile: state.profile.profile,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProfile })(Profile);
