import {
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
} from '../Constants/OrderConstants';
import { logout } from './UserActions';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { ToastObject } from '../../components/LoadingError/ToastObject';

export const listOrders =
  ({ dateOrder, orderStatus, page }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const { data } = await request.get(`/orders?limit=${15}&page=${page}&sortBy=${dateOrder}&status=${orderStatus}`);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data?.data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await request.get(`/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data?.data?.order });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const { data } = await request.put(`/orders/${order._id}/delivered`, {});
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};

//orders PAID
export const updateStatusOrder =
  ({ status, orderId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });

      const { data } = await request.patch(`/orders/${orderId}/${status}`);
      toast.success(data?.message, ToastObject);
      dispatch({ type: ORDER_UPDATE_STATUS_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      toast.error(message, ToastObject);

      dispatch({
        type: ORDER_UPDATE_STATUS_FAIL,
        payload: message,
      });
    }
  };

export const cancelOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CANCEL_REQUEST });

    const { data } = await request.patch(`/orders/${order._id}/cancel`, { orderId: order._id });
    dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload: message,
    });
  }
};
