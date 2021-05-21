import { TOGGLE_MODAL } from '../actions/types';

const initialState = {
  modalOpen: false,
};

const modalReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    default:
      return state;
  }
};

export default modalReducer;
