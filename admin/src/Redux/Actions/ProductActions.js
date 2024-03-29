import {
  PRODUCT_ALL_FAIL,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../Constants/ProductConstants';
import request from '../../utils/request';
import { toast } from 'react-toastify';
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export const listProducts =
  (category = '', keyword = '', pageNumber = '', status = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await request.get(
        `/products/admin?category=${category}&keyword=${keyword}&page=${pageNumber - 1}&limit=12&status=${status}`,
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response?.data?.data || {} });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await request.delete(`/products/${id}`);
    toast.success('Đã xóa sản phẩm', ToastObjects);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObjects);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const restoreProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await request.patch(`/products/${id}/restore`);
    toast.success('Đã khôi phục sản phẩm', ToastObjects);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObjects);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const disableProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await request.patch(`/products/${id}/hide`);
    toast.success('Đã ẩn sản phẩm', ToastObjects);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObjects);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const visibleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await request.patch(`/products/${id}/unhide`);
    toast.success('Đã hiển thị sản phẩm', ToastObjects);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObjects);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = (newProduct, handleAfterFetch) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await request.post(`/products/`, newProduct);
    toast.success('Thêm sản phẩm thành công', ToastObjects);
    handleAfterFetch?.success();
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message, ToastObjects);
    handleAfterFetch?.error();
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};
// EDIT PRODUCT
export const fetchProductToEdit = (id, fetchProduct) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await request.get(`/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data?.data?.product || {} });
    fetchProduct?.success(data?.data?.product || {});
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (product, handleAfterUpdate) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    await request.put(`/products/${product.get('_id')}`, product);

    handleAfterUpdate?.success();
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    toast.error(message, ToastObjects);
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getAllProducts =
  (fetchAllProduct = { success: () => {}, error: () => {} }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_ALL_REQUEST });
      const { data } = await request.get(`/products/all-products`);

      dispatch({ type: PRODUCT_ALL_SUCCESS, payload: data.data.products || { products: [] } });
      fetchAllProduct.success(data?.data.products || []);
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: PRODUCT_ALL_FAIL,
        payload: message,
      });
    }
  };
