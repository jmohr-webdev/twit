import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';
import Moment from 'moment';
import ModalButton from '../layout/ModalButton';
import Modal from '../layout/Modal';

const Home = ({ getAllTwits, twits, modalOpen }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

  return twits ? (
    <>
      <div className="twits-container">
        {twits.map((twit) => (
          <div key={twit._id} className="twit">
            <Link to={`/${twit.username}`}>
              <div className="author-container">
                <i className="fas fa-user-circle fa-3x"></i>
                <div className="twit-author">{twit.username}</div>
              </div>
            </Link>
            <p className="twit-content">{twit.content}</p>
            <span className="twit-date">
              {Moment(twit.createdDate).format('MMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
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
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
});

export default connect(mapStateToProps, { getAllTwits })(Home);
