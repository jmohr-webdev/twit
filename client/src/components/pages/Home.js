import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';
import ModalPostButton from '../layout/ModalPostButton';
import PostModal from '../layout/PostModal';
import Twit from '../twits/Twit';

const Home = ({ getAllTwits, twits, modalOpen, isAuthenticated }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

  return (
    <>
      {twits.length > 0 ? (
        <>
          <div className="twits-container home">
            {twits.map((twit) => (
              <Twit twit={twit} key={twit._id} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-twits-container home">
          <h1 className="no-twits-content">No one has twitted anything.</h1>
        </div>
      )}

      {isAuthenticated && (
        <>
          <ModalPostButton />
          {modalOpen && <PostModal />}
        </>
      )}
    </>
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
