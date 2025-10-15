/*

import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
} from '../constants/productConstants';

const API_URL = process.env.REACT_APP_API_URL || '';

export const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = product._id
      ? await axios.put(`${API_URL}/api/products/${product._id}`, product, config)
      : await axios.post(`${API_URL}/api/products`, product, config);

    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(`${API_URL}/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `${API_URL}/api/products/${productId}/reviews`,
      review,
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_SAVE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

*/

import { axiosInstance } from "../utils/api";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
} from "../constants/productConstants";

export const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axiosInstance.get(`/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axiosInstance.get(`/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { userSignin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = product._id
      ? await axiosInstance.put(`/products/${product._id}`, product, config)
      : await axiosInstance.post(`/products`, product, config);

    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await axiosInstance.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { userSignin: { userInfo } } = getState();
    const { data } = await axiosInstance.post(
      `/products/${productId}/reviews`,
      review,
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_SAVE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
