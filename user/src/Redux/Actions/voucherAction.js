import request from '~/utils/request';
import {
    ADD_VOUCHER_FAIL,
    ADD_VOUCHER_REQUEST,
    ADD_VOUCHER_SUCCESS,
    MY_VOUCHER_FAIL,
    MY_VOUCHER_REQUEST,
    MY_VOUCHER_SUCCESS,
    PUBLIC_VOUCHER_FAIL,
    PUBLIC_VOUCHER_REQUEST,
    PUBLIC_VOUCHER_SUCCESS,
} from '../Constants/VoucherConstants';

export const getMyVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: MY_VOUCHER_REQUEST });
        const { data } = await request.get('/users/discount-code/get-user-discount-code-list');

        dispatch({ type: MY_VOUCHER_SUCCESS, payload: data?.data?.discountCodeList });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: MY_VOUCHER_FAIL,
            payload: message,
        });
    }
};

export const getPriceIsReducedAfterApplyVoucher =
    ({ voucher, orderItems, afterFetchPriceIsReduced }) =>
    async (dispatch) => {
        try {
            const { data } = await request.post('/discount-codes/discount-calculation', {
                discountCode: voucher?.code,
                orderItems,
            });
            afterFetchPriceIsReduced?.success(data.data, voucher);
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            afterFetchPriceIsReduced.error(message);
            dispatch({
                type: MY_VOUCHER_FAIL,
                payload: message,
            });
        } finally {
            afterFetchPriceIsReduced.finally();
        }
    };

export const getPublicVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: PUBLIC_VOUCHER_REQUEST });
        const { data } = await request.get('/discount-codes/');

        dispatch({ type: PUBLIC_VOUCHER_SUCCESS, payload: data?.data?.discountCode });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: PUBLIC_VOUCHER_FAIL,
            payload: message,
        });
    }
};
export const addVoucher =
    ({ code, handleAfterFetch }) =>
    async (dispatch, getState) => {
        try {
            const { publicVouchers } = getState();
            dispatch({ type: ADD_VOUCHER_REQUEST });
            const { data } = await request.post('/users/discount-code/user-add-discount-code', {
                discountCode: code,
            });
            dispatch({ type: ADD_VOUCHER_SUCCESS, payload: data?.data?.discountCode });
            const newPublicVoucher = publicVouchers?.vouchers.map((voucher) => {
                if (voucher?.code === code) {
                    return { ...voucher, isAdd: true };
                } else return voucher;
            });
            handleAfterFetch?.success();
            dispatch({ type: MY_VOUCHER_SUCCESS, payload: data?.data?.discountCodeList });
            dispatch({ type: PUBLIC_VOUCHER_SUCCESS, payload: newPublicVoucher || [] });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            handleAfterFetch?.error(message);

            dispatch({
                type: ADD_VOUCHER_FAIL,
                payload: message,
            });
        }
    };
