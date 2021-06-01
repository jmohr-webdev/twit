import { TOGGLE_MODAL, TOGGLE_PROFILE_MODAL } from '../actions/types';

const initialState = {
  modalOpen: false,
  profileModalOpen: false,
};

const modalReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    case TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        profileModalOpen: !state.profileModalOpen,
      };
    default:
      return state;
  }
};

export default modalReducer;
