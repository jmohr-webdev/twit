import axios from 'axios';
import { popupToast } from '../actions/toast';
import {
  GET_FOLLOWING,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOWING_ERROR,
} from './types';

// ************************************* GET FOLLOWING *************************************
export const getFollowing = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`api/v1/${username}/following`);

    dispatch({ type: GET_FOLLOWING, payload: res.data.following.following });
  } catch (error) {}
};

// ************************************* FOLLOW A USER *************************************
export const followUser = (username) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/${username}/follow`);

    dispatch({ type: FOLLOW_USER, payload: username });

    dispatch(popupToast(`You followed ${username}`, 'success'));
  } catch (error) {
    dispatch({ type: FOLLOWING_ERROR });
    console.log(error);
    dispatch(popupToast(error, 'failure'));
  }
};

// ************************************* UNFOLLOW A USER *************************************
export const unfollowUser = (username) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/${username}/unfollow`);

    dispatch({ type: UNFOLLOW_USER, payload: username });
    dispatch(popupToast(`You unfollowed ${username}`, 'success'));
  } catch (error) {
    dispatch({ type: FOLLOWING_ERROR });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};
