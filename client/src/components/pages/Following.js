import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFollowingTwits } from '../../actions/twits';
import ModalPostButton from '../layout/ModalPostButton';
import Modal from '../layout/Modal';
import Twit from '../twits/Twit';

const Following = ({
  getFollowingTwits,
  twits,
  modalOpen,
  isAuthenticated,
}) => {
  useEffect(() => {
    getFollowingTwits();
  }, [getFollowingTwits]);

  return twits ? (
    <>
      <div className="twits-container">
        {twits.map((twit) => (
          <Twit twit={twit} key={twit._id} />
        ))}
      </div>
      {isAuthenticated && (
        <>
          <ModalPostButton />
          {modalOpen && <Modal />}
        </>
      )}
    </>
  ) : (
    <div>
      <h1>Not following anyone</h1>
    </div>
  );
};

Following.propTypes = {
  getFollowingTwits: PropTypes.func.isRequired,
  twits: PropTypes.array,
  modalOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getFollowingTwits })(Following);
