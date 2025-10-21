// src/actions/userActions.js
import axiosInstance from "../utils/api"; // ✅ centralized axios
import Cookies from "js-cookie";
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
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

// Utility for clear error messages
const getErrorMessage = (error) =>
  error.response?.data?.message || error.message;

// --- Sign In ---
export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await axiosInstance.post(
      "/users/signin",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    // Save user data
    Cookies.set("userInfo", JSON.stringify(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Register ---
export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });

  try {
    const { data } = await axiosInstance.post(
      "/users/register",
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // Auto sign-in
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    Cookies.set("userInfo", JSON.stringify(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Update Profile ---
export const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });

  try {
    const { data } = await axiosInstance.put(
      `/users/${userId}`,
      { name, email, password },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    // Keep updated user info in cookies/localStorage
    Cookies.set("userInfo", JSON.stringify(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

// --- Logout ---
export const logout = () => (dispatch) => {
  Cookies.remove("userInfo");
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
