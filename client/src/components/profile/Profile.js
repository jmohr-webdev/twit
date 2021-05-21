import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserTwits } from '../../actions/twits';
import Twit from '../twits/Twit';

const Profile = ({ match, getUserTwits, twits }) => {
  useEffect(() => {
    getUserTwits(match.params.username);
  }, [getUserTwits]);

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
      <h1>No twits</h1>
    </div>
  );
};

Profile.propTypes = {
  getUserTwits: PropTypes.func.isRequired,
  twits: PropTypes.array,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
});

export default connect(mapStateToProps, { getUserTwits })(Profile);
