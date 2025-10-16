

// src/actions/userActions.js
import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../constants/userConstants";

// Base URL for backend API
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://ecommerce-doris.onrender.com'; //'http://localhost:5001';

// Utility to extract meaningful error messages
const getErrorMessage = (error) =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;

// --- Sign In ---
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(
      `${API_BASE}/api/users/signin`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    // Save to cookie and localStorage (optional)
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Register ---
const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post(
      `${API_BASE}/api/users/register`,
      { name, email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Auto sign-in on registration
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    // Save to cookie and localStorage
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Update Profile ---
const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });

  try {
    const { data } = await Axios.put(
      `${API_BASE}/api/users/${userId}`,
      { name, email, password },
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    // Update user info in storage
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Logout ---
const logout = () => (dispatch) => {
  Cookie.remove('userInfo');
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export { signin, register, logout, update };



/*


import { axiosInstance } from "../utils/api";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../constants/userConstants";

// Utility to extract meaningful error messages
const getErrorMessage = (error) =>
  error.response?.data?.message || error.message;

// --- Sign In ---
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axiosInstance.post('/users/signin', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Register ---
const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axiosInstance.post('/users/register', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Update Profile ---
const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, { name, email, password }, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Logout ---
const logout = () => (dispatch) => {
  Cookie.remove('userInfo');
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export { signin, register, logout, update };


*/