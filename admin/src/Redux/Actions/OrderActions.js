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
  ORDER_PREVIEW_FAIL,
  ORDER_PREVIEW_REQUEST,
  ORDER_PREVIEW_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
} from '../Constants/OrderConstants';

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

    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};

//orders PAID
export const updateStatusOrder =
  ({ status, orderId, delivery, handleAfterFetch }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });

      const { data } = await request.patch(`/orders/${orderId}/${status}`, { requiredNote: delivery?.requiredNote });
      toast.success(data?.message || 'Cập nhật trạng thái đơn hàng thành công', ToastObject);
      handleAfterFetch?.success();
      dispatch({ type: ORDER_UPDATE_STATUS_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      toast.error(message || 'Cập nhật trạng thái đơn hàng thất bại', ToastObject);
      handleAfterFetch?.error();
      dispatch({
        type: ORDER_UPDATE_STATUS_FAIL,
        payload: message,
      });
    }
  };

export const cancelOrder =
  ({ orderId, description, handleAfterFetch }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_CANCEL_REQUEST });

      const { data } = await request.patch(`/orders/${orderId}/cancel`, { description });
      handleAfterFetch?.success();
      dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      handleAfterFetch?.error(message);

      dispatch({
        type: ORDER_CANCEL_FAIL,
        payload: message,
      });
    }
  };

export const getPreviewOrder =
  ({ orderId = '', handleAfterFetch = { success: () => {}, error: () => {} } }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_PREVIEW_REQUEST });

      const { data } = await request.post(`/deliveries/shipping-order/${orderId}/preview`);
      handleAfterFetch?.success();
      dispatch({ type: ORDER_PREVIEW_SUCCESS, payload: data?.data?.deliveryInfo });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      handleAfterFetch?.error(message);

      dispatch({
        type: ORDER_PREVIEW_FAIL,
        payload: message,
      });
    }
  };
