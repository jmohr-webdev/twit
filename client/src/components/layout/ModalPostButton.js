import React from 'react';
import PropTypes from 'prop-types';
import { toggleModal } from '../../actions/modal';
import { connect } from 'react-redux';

const ModalPostButton = ({ toggleModal }) => {
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

ModalPostButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default connect(null, { toggleModal })(ModalPostButton);
