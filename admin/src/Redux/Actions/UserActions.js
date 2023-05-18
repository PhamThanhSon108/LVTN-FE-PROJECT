import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../Constants/UserContants';
import request, { API_FASHIONSHOP } from '../../utils/request';
import { toast } from 'react-toastify';
import axios from 'axios';

// LOGIN
export const login = (email, password, handleLogin) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(`${API_FASHIONSHOP}users/login`, { email, password });
    if (data?.data?.user?.role !== 'admin') {
      toast.error('Bạn không có quyền truy cập', ToastObjects);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data?.data.user, accessToken: data?.data?.accessToken } });
      localStorage.setItem('userInfo', JSON.stringify({ ...data?.data.user, accessToken: data?.data?.accessToken }));
      handleLogin.success();
    }
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
    handleLogin.error(message);
  }
};

// LOGOUT
export const logout = (history) => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  history.push('/login');
};

// ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await request.get(`/users`);

    dispatch({ type: USER_LIST_SUCCESS, payload: data?.data?.users || [] });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};
