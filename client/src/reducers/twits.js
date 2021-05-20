import { GET_ALL_TWITS, TWITS_ERROR } from '../actions/types';

const initialState = [];

function twitReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TWITS:
      return state.concat(payload);
    case TWITS_ERROR:
      console.log('There was an error getting the twits');
      return state;
    default:
      return state;
  }
}

export default twitReducer;
