import { TOGGLE_MODAL } from './types';

export const toggleModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODAL });
};
