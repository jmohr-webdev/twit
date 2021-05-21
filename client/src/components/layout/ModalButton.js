import React from 'react';
import PropTypes from 'prop-types';
import { toggleModal } from '../../actions/modal';
import { connect } from 'react-redux';

const ModalButton = ({ toggleModal }) => {
  const handleClick = () => {
    toggleModal();
  };

  return (
    <>
      <button className="add-button" onClick={(e) => handleClick(e)}>
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
};

ModalButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default connect(null, { toggleModal })(ModalButton);
