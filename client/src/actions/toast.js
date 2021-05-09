import { POPUP_TOAST, REMOVE_TOAST } from './types';
import { v4 as uuidv4 } from 'uuid';

export const popupToast = (msg, toastType, timeout = 3000) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: POPUP_TOAST,
    payload: { msg, toastType, id },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_TOAST,
      payload: id,
    });
  }, timeout);
};
