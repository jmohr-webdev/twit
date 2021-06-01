import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modal';
import { postTwit } from '../../actions/twits';

const Modal = ({ toggleModal, postTwit }) => {
  const [content, setContent] = useState('');

  const handleClose = () => {
    setContent('');
    toggleModal();
  };

  return (
    <div className="modal-container" id="modal-container">
      <div className="modal">
        <h1 className="modal-title">Post a Twit</h1>
        <i
          className="fas fa-times-circle"
          onClick={() => {
            handleClose();
          }}
        ></i>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postTwit({ content });
            handleClose();
          }}
        >
          <textarea
            name="content"
            className="twit-post-content"
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="form-buttons">
            <input
              type="cancel"
              className="btn cancel"
              value="Cancel"
              onClick={handleClose}
            />
            <input type="submit" className="btn post" value="Post" />
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  postTwit: PropTypes.func.isRequired,
};

export default connect(null, { toggleModal, postTwit })(Modal);
