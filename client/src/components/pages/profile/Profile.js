import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/profile';
import ProfileHead from './ProfileHead';
import Twit from '../../twits/Twit';

const Profile = ({ match, getProfile, twits, profile }) => {
  useEffect(() => {
    getProfile(match.params.username);
  }, [getProfile]);

  return (
    <>
      <ProfileHead profile={profile} />

      {twits ? (
        <>
          <div className="twits-container profile">
            {twits.map((twit) => (
              <Twit twit={twit} key={twit._id} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>No twits</h1>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  twits: PropTypes.array,
};

const mapStateToProps = (state) => ({
  twits: state.twits.twits,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
