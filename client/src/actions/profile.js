import axios from 'axios';
import { popupToast } from '../actions/toast';
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_USER_TWITS,
} from './types';

// ************************************* GET A PROFILE *************************************
export const getProfile = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/${username}`);

    dispatch({ type: GET_USER_TWITS, payload: res.data.twits });
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* UPDATE A PROFILE *************************************
export const updateProfile = (username, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/v1/${username}`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });

    dispatch(popupToast('Updated profile', 'success'));
  } catch (error) {
    dispatch({ type: PROFILE_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};
