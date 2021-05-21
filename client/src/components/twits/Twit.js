import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'moment';
import { deleteTwit } from '../../actions/twits';

const Twit = ({ twit, user, deleteTwit }) => {
  const currentUser = user && twit.username === user.username;

  return (
    <>
      <div className={`twit ${currentUser ? 'flat-bottom' : ''} `}>
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
        <div className="delete-bar">
          <i
            className="fas fa-trash-alt"
            onClick={() => deleteTwit(user.username, twit._id)}
          ></i>
        </div>
      )}
    </>
  );
};

Twit.propTypes = {
  twit: PropTypes.object.isRequired,
  deleteTwit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteTwit })(Twit);
