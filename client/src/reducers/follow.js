import {
  GET_FOLLOWING,
  GET_FOLLOWERS,
  FOLLOWING_ERROR,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from '../actions/types';
const initialState = {
  following: [],
  followers: [],
};

const followReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FOLLOWING:
      return {
        ...state,
        following: payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: payload,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: payload,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: payload,
      };
    case FOLLOWING_ERROR:
    default:
      return state;
  }
};

export default followReducer;
