import {
  GET_ALL_TWITS,
  GET_USER_TWITS,
  POST_TWIT,
  DELETE_TWIT,
  TWITS_ERROR,
  GET_FOLLOWING_TWITS,
} from '../actions/types';

const initialState = {
  twits: [],
  loading: true,
};

function twitReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TWITS:
    case GET_USER_TWITS:
    case GET_FOLLOWING_TWITS:
      return {
        ...state,
        twits: payload,
        loading: false,
      };
    case POST_TWIT:
      return { ...state, twits: [payload, ...state.twits], loading: false };
    case DELETE_TWIT:
      return {
        ...state,
        twits: state.twits.filter((twit) => twit._id !== payload),
        loading: false,
      };
    case TWITS_ERROR:
      return state;
    default:
      return state;
  }
}

export default twitReducer;
