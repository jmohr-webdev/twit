import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';

const Home = ({ getAllTwits, twits }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

  return (
    <div className="twits-container">
      {twits.map((twit) => (
        <div key={twit._id} className="twit">
          <Link to={`/${twit.username}`}>
            <div className="author-container">
              <i className="fas fa-user-circle fa-3x"></i>
              <div className="twit-author">{twit.username}</div>
            </div>
          </Link>
          <p className="twit-content">{twit.content}</p>
          <span className="twit-date">{twit.createdDate}</span>
        </div>
      ))}
    </div>
  );
};

Home.propTypes = {
  getAllTwits: PropTypes.func.isRequired,
  twits: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  twits: state.twits,
});

export default connect(mapStateToProps, { getAllTwits })(Home);
