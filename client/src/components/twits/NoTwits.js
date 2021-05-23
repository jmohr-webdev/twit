import React from 'react';
import PropTypes from 'prop-types';

const NoTwits = ({ msg }) => {
  return (
    <div className="no-twits-container">
      <h1 className="no-twits-content">{msg}</h1>
    </div>
  );
};

NoTwits.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default NoTwits;
