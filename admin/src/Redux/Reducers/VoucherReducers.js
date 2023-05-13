import {
  VOUCHER_ADD_FAIL,
  VOUCHER_ADD_REQUEST,
  VOUCHER_ADD_RESET,
  VOUCHER_ADD_SUCCESS,
  // VOUCHER_CHILDREN_FAIL,
  // VOUCHER_CHILDREN_REQUEST,
  // VOUCHER_CHILDREN_SUCCESS,
  // VOUCHER_DELETE_FAIL,
  // VOUCHER_DELETE_REQUEST,
  // VOUCHER_DELETE_RESET,
  // VOUCHER_DELETE_SUCCESS,
  // VOUCHER_FAIL,
  // VOUCHER_REQUEST,
  // VOUCHER_SUCCESS,
  // VOUCHER_UPDATE_FAIL,
  // VOUCHER_UPDATE_REQUEST,
  // VOUCHER_UPDATE_RESET,
  // VOUCHER_UPDATE_SUCCESS,
  // UPDATE_WHEN_ADD_VOUCHER_SUCCESS,
  // UPDATE_WHEN_DELETE_VOUCHER_SUCCESS,
} from '../Constants/VoucherConstants';

export const voucherReducer = (state = {}, action) => {
  switch (action.type) {
    case VOUCHER_ADD_REQUEST:
      return { loading: true };
    case VOUCHER_ADD_SUCCESS:
      return { loading: false, success: true };
    case VOUCHER_ADD_FAIL:
      return { loading: false, error: action.payload };
    case VOUCHER_ADD_RESET:
      return {};
    default:
      return state;
  }
};
