import axios from 'axios';
import { popupToast } from '../actions/toast';
import { FOLLOW_USER, UNFOLLOW_USER, FOLLOWING_ERROR } from './types';

// ************************************* FOLLOW A USER *************************************
export const followUser = (username) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/${username}/follow`);

    dispatch({ type: FOLLOW_USER });
    dispatch(popupToast(`You followed ${username}`, 'success'));
  } catch (error) {
    dispatch({ type: FOLLOWING_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* UNFOLLOW A USER *************************************
export const unfollowUser = (username) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/${username}/unfollow`);

    dispatch({ type: UNFOLLOW_USER });
    dispatch(popupToast(`You unfollowed ${username}`, 'success'));
  } catch (error) {
    dispatch({ type: FOLLOWING_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};
