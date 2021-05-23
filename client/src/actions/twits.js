import axios from 'axios';
import {
  GET_ALL_TWITS,
  GET_USER_TWITS,
  GET_FOLLOWING_TWITS,
  DELETE_TWIT,
  POST_TWIT,
  TWITS_ERROR,
} from './types';
import { popupToast } from '../actions/toast';

// ************************************* GET TWITS FROM EVERYONE  *************************************
export const getAllTwits = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/twits');

    dispatch({
      type: GET_ALL_TWITS,
      payload: res.data.twits,
    });
  } catch (error) {
    dispatch({
      type: TWITS_ERROR,
    });
    dispatch(popupToast(error.response, 'failure'));
  }
};

// ************************************* GET A USERS TWITS *************************************
export const getUserTwits = (user) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/twits/${user}`);

    dispatch({ type: GET_USER_TWITS, payload: res.data.twits });
  } catch (error) {
    dispatch({
      type: TWITS_ERROR,
    });
    dispatch(popupToast(error.response, 'failure'));
  }
};

// ************************************* GET FOLLOWING TWITS  *************************************
export const getFollowingTwits = () => async (dispatch) => {
  try {
    const res = await axios.get(`api/v1/twits/following`);

    dispatch({ type: GET_FOLLOWING_TWITS, payload: res.data.twits });
  } catch (error) {
    dispatch({
      type: TWITS_ERROR,
    });
    dispatch(popupToast(error.response, 'failure'));
  }
};

// ************************************* POST A TWIT *************************************
export const postTwit = (content) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/v1/twits/post', content, config);

    dispatch({ type: POST_TWIT, payload: res.data });
    dispatch(popupToast('Twit posted', 'success'));
  } catch (error) {
    dispatch({
      type: TWITS_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* DELETE A TWIT *************************************
export const deleteTwit = (username, twitId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/twits/${username}/${twitId}`);

    dispatch({ type: DELETE_TWIT, payload: twitId });
    dispatch(popupToast('Twit deleted', 'success'));
  } catch (error) {
    dispatch({
      type: TWITS_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};
