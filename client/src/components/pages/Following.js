import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFollowing } from '../../actions/follow';
import { getFollowingTwits } from '../../actions/twits';
import ModalPostButton from '../layout/ModalPostButton';
import PostModal from '../layout/PostModal';
import Twit from '../twits/Twit';
import NoTwits from '../twits/NoTwits';

const Following = ({
  getFollowingTwits,
  getFollowing,
  twits,
  modalOpen,
  isAuthenticated,
  user,
  following,
}) => {
  useEffect(() => {
    if (user) {
      getFollowing(user.username);
    }
    getFollowingTwits();
  }, [getFollowingTwits, user, getFollowing]);

  return (
    <>
      {twits.length > 0 ? (
        <div className="twits-container">
          {twits.map((twit) => (
            <Twit twit={twit} key={twit._id} />
          ))}
        </div>
      ) : (
        <NoTwits
          msg={
            following <= 0
              ? `You're not following anyone yet.`
              : `No one you follow has twitted anything yet`
          }
        />
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

Following.propTypes = {
  getFollowingTwits: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  twits: PropTypes.array,
  modalOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  following: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  twits: state.twits.twits,
  modalOpen: state.modal.modalOpen,
  isAuthenticated: state.auth.isAuthenticated,
  following: state.follow.following,
});

export default connect(mapStateToProps, { getFollowingTwits, getFollowing })(
  Following
);
