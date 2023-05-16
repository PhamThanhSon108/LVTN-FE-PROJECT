import request from '../../utils/request';
import {
  VOUCHER_ADD_FAIL,
  VOUCHER_ADD_REQUEST,
  VOUCHER_ADD_SUCCESS,
  VOUCHER_FAIL,
  VOUCHER_REQUEST,
  VOUCHER_SUCCESS,
  VOUCHER_UPDATE_FAIL,
  VOUCHER_UPDATE_REQUEST,
  VOUCHER_UPDATE_SUCCESS,
  UPDATE_WHEN_ADD_VOUCHER_SUCCESS,
  VOUCHER_DETAIL_REQUEST,
  VOUCHER_DETAIL_SUCCESS,
  VOUCHER_DETAIL_FAIL,
  //   UPDATE_WHEN_DELETE_VOUCHER_SUCCESS,
} from '../Constants/VoucherConstants';
export const AddVoucher =
  ({ voucher = { code: '', name: '', discountType: 1, discount: 0 }, createVoucherStatus }) =>
  async (dispatch) => {
    try {
      console.log(voucher);
      dispatch({ type: VOUCHER_ADD_REQUEST });
      const { data } = await request.post(`/discount-codes`, voucher);
      dispatch({ type: VOUCHER_ADD_SUCCESS, payload: data });
      dispatch({ type: UPDATE_WHEN_ADD_VOUCHER_SUCCESS, payload: data?.data?.newDiscountCode });

      createVoucherStatus?.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: VOUCHER_ADD_FAIL,
        payload: message,
      });
      createVoucherStatus?.error(message);
    } finally {
      createVoucherStatus?.finally();
    }
  };

export const UpdateVoucher =
  ({ voucher = { code: '', name: '', discountType: 1, discount: 0 }, createVoucherStatus }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VOUCHER_ADD_REQUEST });
      const { data } = await request.put(`/discount-codes/${voucher._id}`, voucher);
      dispatch({ type: VOUCHER_ADD_SUCCESS, payload: data });
      dispatch({ type: UPDATE_WHEN_ADD_VOUCHER_SUCCESS, payload: data?.data?.newDiscountCode });

      createVoucherStatus?.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: VOUCHER_ADD_FAIL,
        payload: message,
      });
      createVoucherStatus?.error(message);
    } finally {
      createVoucherStatus?.finally();
    }
  };

export const getVouchers =
  ({ page, limit, handleAfterFetch }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VOUCHER_REQUEST });
      const { data } = await request.get(`/discount-codes`, { params: { page, limit } });
      dispatch({ type: VOUCHER_SUCCESS, payload: data?.data?.discountCode || [] });

      handleAfterFetch?.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: VOUCHER_FAIL,
        payload: message,
      });
      handleAfterFetch?.error(message);
    } finally {
      handleAfterFetch?.finally();
    }
  };

export const updateVoucher =
  ({ id, handleAfterFetch }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VOUCHER_UPDATE_REQUEST });
      const { data } = await request.get(`/discount-codes/${id}`);
      dispatch({ type: VOUCHER_UPDATE_SUCCESS, payload: data?.data?.discountCode || [] });

      handleAfterFetch?.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: VOUCHER_UPDATE_FAIL,
        payload: message,
      });
      handleAfterFetch?.error(message);
    } finally {
      handleAfterFetch?.finally();
    }
  };

export const getVoucher =
  ({ id, handleAfterFetch }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VOUCHER_DETAIL_REQUEST });
      const { data } = await request.get(`/discount-codes/${id}`);
      dispatch({ type: VOUCHER_DETAIL_SUCCESS, payload: data?.data?.discountCode || [] });

      handleAfterFetch?.success(data?.data?.discountCode);
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: VOUCHER_DETAIL_FAIL,
        payload: message,
      });
      handleAfterFetch?.error(message);
    } finally {
      handleAfterFetch?.finally();
    }
  };
