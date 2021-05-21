import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';
import ModalButton from '../layout/ModalButton';
import Modal from '../layout/Modal';
import Twit from '../twits/Twit';

const Home = ({ getAllTwits, twits, modalOpen }) => {
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
      <ModalButton />
      {modalOpen && <Modal />}
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
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
});

export default connect(mapStateToProps, { getAllTwits })(Home);
