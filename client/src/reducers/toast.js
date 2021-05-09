import { POPUP_TOAST, REMOVE_TOAST } from '../actions/types';

const initialState = [];

function toastReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POPUP_TOAST:
      return [...state, payload];
    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== payload);
    default:
      return state;
  }
}

export default toastReducer;
