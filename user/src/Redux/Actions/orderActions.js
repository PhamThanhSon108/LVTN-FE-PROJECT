import {
    ORDER_ADDRESS_MY_FAIL,
    ORDER_ADDRESS_MY_REQUEST,
    ORDER_ADDRESS_MY_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_ALL_FAIL,
    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
    ORDER_CONFIRM_PAID_REQUEST,
    ORDER_CONFIRM_PAID_SUCCESS,
    ORDER_CONFIRM_PAID_FAIL,
} from '../Constants/OrderConstants';
import CART_CONST from '../Constants/CartConstants';
import { logout } from './userActions';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/components/LoadingError/Toast';
import { addOrder, getOrder, getOrdersByUser } from '~/services/orderServices';
import { clearLocalStorage } from '~/utils/localStorage';

// CREATE ORDER
export const createOrder = (order, handleAfterFetch) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const { data } = await addOrder(order);
        handleAfterFetch?.success(data.data.newOrder);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CONST?.CART_ORDER_RESET });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        handleAfterFetch?.error(message);

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    } finally {
        handleAfterFetch?.finally();
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { data } = await getOrder(id);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data.order || {} });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// ORDER PAY
export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const { data } = await request.put(`/orders/${orderId}/pay`, paymentResult);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        });
    }
};

// USER ORDERS
export const getMyOrders =
    ({ page = 0 }) =>
    async (dispatch, getState) => {
        try {
            const { userLogin } = getState();
            dispatch({ type: ORDER_LIST_MY_REQUEST });
            const { data } = await getOrdersByUser({ userId: userLogin?.userInfo._id, page });
            dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data?.data || { orders: [], page: 0, pages: 1 } });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;

            dispatch({
                type: ORDER_LIST_MY_FAIL,
                payload: message,
            });
        }
    };

//GET ORDER
export const orderGetAddress = () => async (dispatch, getState) => {
    try {
        const { userInfo } = getState();
        dispatch({ type: ORDER_ADDRESS_MY_REQUEST });
        const { data } = await request.get(`/orders/${userInfo._id}/address`);
        dispatch({ type: ORDER_ADDRESS_MY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: ORDER_ADDRESS_MY_FAIL,
            payload: message,
        });
    }
};

// ODERS LIST ALL
export const getBestSellerProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_ALL_REQUEST });
        const { data } = await request.get(`/products?&sortBy=total_sales&limit=16`);
        dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: data?.data?.products || [] });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
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

export const confirmPaid =
    ({ orderId }) =>
    async (dispatch) => {
        try {
            dispatch({ type: ORDER_CONFIRM_PAID_REQUEST });

            const { data } = await request.patch(`/orders/${orderId}/received`);
            toast.success('Xác nhận đã nhận được hàng', Toastobjects);
            dispatch({ type: ORDER_CONFIRM_PAID_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            toast.error(message || 'Có lỗi trong quá trình xử lý', Toastobjects);

            dispatch({
                type: ORDER_CONFIRM_PAID_FAIL,
                payload: message,
            });
        }
    };
