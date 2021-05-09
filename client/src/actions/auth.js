import axios from 'axios';
import { popupToast } from '../actions/toast';
import {
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

// ************************************* REGISTER ACTION *************************************
export const register = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/v1', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* LOGIN ACTION *************************************
export const login = ({ usernameOrEmail, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ usernameOrEmail, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(popupToast('Logged in', 'success'));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(popupToast(error.response.data.msg, 'failure'));
  }
};

// ************************************* LOGOUT ACTION *************************************
export const logout = () => ({ type: LOGOUT });
