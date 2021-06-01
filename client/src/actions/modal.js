import { TOGGLE_MODAL, TOGGLE_PROFILE_MODAL } from './types';

export const toggleModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODAL });
};

export const toggleProfileModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_PROFILE_MODAL });
};
