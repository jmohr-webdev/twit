import axios from 'axios';
import { GET_ALL_TWITS, TWITS_ERROR } from './types';

// ************************************* GET TWITS *************************************
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
  }
};

// ************************************* SET LOADING *************************************
