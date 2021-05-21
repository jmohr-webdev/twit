import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';
import Moment from 'moment';
import ModalButton from '../layout/ModalButton';
import Modal from '../layout/Modal';

const Home = ({ getAllTwits, twits, modalOpen, user }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

  return twits ? (
    <>
      <div className="twits-container">
        {twits.map((twit) => {
          const currentUser = user && twit.username === user.username;
          return (
            <>
              <div
                key={twit._id}
                className={`twit ${currentUser ? 'flat-bottom' : ''} `}
              >
                <Link to={`/${twit.username}`}>
                  <div className="author-container">
                    <i className="fas fa-user-circle fa-3x"></i>
                    <div className="twit-author">{twit.username}</div>
                  </div>
                </Link>
                <p className="twit-content">{twit.content}</p>
                <div className="twit-date">
                  {Moment(twit.createdDate).format('MMM Do YYYY, h:mm:ss a')}
                </div>
              </div>
              {user && user.username === twit.username && (
                <div class="delete-bar">
                  <i className="fas fa-trash-alt"></i>
                </div>
              )}
            </>
          );
        })}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAllTwits })(Home);
