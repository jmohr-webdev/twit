import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTwits } from '../../actions/twits';

const Home = ({ getAllTwits, twits }) => {
  useEffect(() => {
    getAllTwits();
  }, [getAllTwits]);

  return (
    <div>
      {twits.map((twit) => (
        <div key={twit._id} className="twit">
          <div className="twit-author">{twit.username}</div>
          <p className="twit-content">{twit.content}</p>
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
