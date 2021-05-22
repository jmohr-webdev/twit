import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';
import ModalPostButton from '../layout/ModalPostButton';
import Modal from '../layout/Modal';
import Twit from '../twits/Twit';

const Home = ({ getAllTwits, twits, modalOpen, isAuthenticated }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

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
      <h1>No twits</h1>
    </div>
  );
};

Home.propTypes = {
  getAllTwits: PropTypes.func.isRequired,
  twits: PropTypes.array.isRequired,
  user: PropTypes.object,
  modalOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllTwits })(Home);
