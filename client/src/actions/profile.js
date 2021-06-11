import axios from 'axios';
import { popupToast } from '../actions/toast';
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  PROFILE_ERROR,
  GET_USER_TWITS,
} from './types';

// ************************************* GET A PROFILE *************************************
export const getProfile = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/${username}`);
    dispatch({ type: GET_USER_TWITS, payload: res.data.profile.twits });
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

// ************************************* UPlOAD A PHOTO *************************************
export const updateAvatar = (username, avatar) => async (dispatch) => {
  try {
    const changeAvatar = new FormData();
    changeAvatar.append('avatar', avatar);

    const res = await axios.put(`api/v1/${username}/avatar`, changeAvatar);

    dispatch({ type: UPDATE_AVATAR, payload: res.data.profile });
  } catch (error) {
    dispatch({ type: PROFILE_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};
