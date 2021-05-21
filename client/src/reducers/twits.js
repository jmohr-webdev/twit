import {
  GET_ALL_TWITS,
  GET_USER_TWITS,
  POST_TWIT,
  TWITS_ERROR,
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
      return {
        ...state,
        twits: payload,
        loading: false,
      };
    case POST_TWIT:
      return { ...state, twits: [payload, ...state.twits], loading: false };
    case TWITS_ERROR:
      console.log('There was an error getting the twits');
      return state;
    default:
      return state;
  }
}

export default twitReducer;
