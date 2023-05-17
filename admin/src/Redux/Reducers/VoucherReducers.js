import {
  VOUCHER_ADD_FAIL,
  VOUCHER_ADD_REQUEST,
  VOUCHER_ADD_RESET,
  VOUCHER_ADD_SUCCESS,
  VOUCHER_DELETE_FAIL,
  VOUCHER_DELETE_REQUEST,
  VOUCHER_DELETE_SUCCESS,
  VOUCHER_DETAIL_FAIL,
  VOUCHER_DETAIL_REQUEST,
  VOUCHER_DETAIL_SUCCESS,
  // VOUCHER_CHILDREN_FAIL,
  // VOUCHER_CHILDREN_REQUEST,
  // VOUCHER_CHILDREN_SUCCESS,
  // VOUCHER_DELETE_FAIL,
  // VOUCHER_DELETE_REQUEST,
  // VOUCHER_DELETE_RESET,
  // VOUCHER_DELETE_SUCCESS,
  VOUCHER_FAIL,
  VOUCHER_REQUEST,
  VOUCHER_SUCCESS,
  VOUCHER_UPDATE_FAIL,
  VOUCHER_UPDATE_REQUEST,
  VOUCHER_UPDATE_RESET,
  VOUCHER_UPDATE_SUCCESS,
  // UPDATE_WHEN_ADD_VOUCHER_SUCCESS,
  // UPDATE_WHEN_DELETE_VOUCHER_SUCCESS,
} from '../Constants/VoucherConstants';

export const voucherReducer = (state = { loading: false, loadingAdd: false, vouchers: [] }, action) => {
  switch (action.type) {
    case VOUCHER_REQUEST:
      return { ...state, loading: true };
    case VOUCHER_SUCCESS:
      return { ...state, vouchers: action.payload, loading: false, success: true };
    case VOUCHER_FAIL:
      return { ...state, loading: false, success: false };

    case VOUCHER_ADD_REQUEST:
      return { ...state, loadingAdd: true };
    case VOUCHER_ADD_SUCCESS:
      return { ...state, loadingAdd: false, successAdd: true };
    case VOUCHER_ADD_FAIL:
      return { ...state, loadingAdd: false, errorAdd: action.payload };
    case VOUCHER_ADD_RESET:
      return {};

    case VOUCHER_UPDATE_REQUEST:
      return { ...state, loadingUpdate: true };
    case VOUCHER_UPDATE_SUCCESS:
      return { ...state, loadingUpdate: false, successUpdate: true };
    case VOUCHER_UPDATE_FAIL:
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case VOUCHER_UPDATE_RESET:
      return {};

    case VOUCHER_DETAIL_REQUEST:
      return { ...state, loadingDetail: true };
    case VOUCHER_DETAIL_SUCCESS:
      return { ...state, loadingDetail: false, successDetail: true, voucher: action.payload };
    case VOUCHER_DETAIL_FAIL:
      return { ...state, loadingDetail: false, errorDetail: action.payload };

    case VOUCHER_DELETE_REQUEST:
      return { ...state, loadingDelete: true };
    case VOUCHER_DELETE_SUCCESS:
      return { ...state, loadingDelete: false, successDelete: true };
    case VOUCHER_DELETE_FAIL:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    default:
      return state;
  }
};
