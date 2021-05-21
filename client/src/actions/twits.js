import axios from 'axios';
import { GET_ALL_TWITS, POST_TWIT, TWITS_ERROR } from './types';
import { popupToast } from '../actions/toast';

// ************************************* GET TWITS *************************************
export const getAllTwits = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/twits');

    dispatch({
      type: GET_ALL_TWITS,
      payload: res.data.twits,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TWITS_ERROR,
    });
    dispatch(popupToast(error.response, 'failure'));
  }
};

// ************************************* POST A TWIT *************************************
export const postTwit = (content) => async (dispatch) => {
  console.log(content);
  console.log('calling post twit');
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
    console.error(error);
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* SET LOADING *************************************
