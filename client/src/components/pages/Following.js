import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFollowingTwits } from '../../actions/twits';
import Twit from '../twits/Twit';

const Following = ({ getFollowingTwits, twits }) => {
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
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
});

export default connect(mapStateToProps, { getFollowingTwits })(Following);
