import axios from 'axios';
import { popupToast } from '../actions/toast';
import setAuthToken from '../utility/setAuthToken';
import {
  USER_LOADED,
  LOGOUT,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
} from './types';

// ************************************* LOAD USER ACTION *************************************
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// ************************************* REGISTER ACTION *************************************
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
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
      dispatch(loadUser());
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
      dispatch(popupToast(error.response.data.msg, 'failure'));
    }
  };

// ************************************* LOGIN ACTION *************************************
export const login =
  ({ usernameOrEmail, password }) =>
  async (dispatch) => {
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
      dispatch(loadUser());
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
      dispatch(popupToast(error.response.data.msg, 'failure'));
    }
  };

// ************************************* LOGOUT ACTION *************************************
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
