import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFollowing } from '../../actions/follow';
import { getFollowingTwits } from '../../actions/twits';
import ModalPostButton from '../layout/ModalPostButton';
import Modal from '../layout/Modal';
import Twit from '../twits/Twit';
import NoTwits from '../twits/NoTwits';

const Following = ({
  getFollowingTwits,
  getFollowing,
  twits,
  modalOpen,
  isAuthenticated,
  user,
}) => {
  useEffect(() => {
    if (user) {
      getFollowing(user.username);
    }
    getFollowingTwits();
  }, [getFollowingTwits, user, getFollowing]);

  return (
    <>
      {twits.length > 0 ? (
        <div className="twits-container">
          {twits.map((twit) => (
            <Twit twit={twit} key={twit._id} />
          ))}
        </div>
      ) : (
        <NoTwits msg={`You're not following anyone yet.`} />
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

Following.propTypes = {
  getFollowingTwits: PropTypes.func.isRequired,
  twits: PropTypes.array,
  modalOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getFollowingTwits, getFollowing })(
  Following
);
