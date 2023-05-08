import request from '~/utils/request';
import { MY_VOUCHER_FAIL, MY_VOUCHER_REQUEST, MY_VOUCHER_SUCCESS } from '../Constants/VoucherConstants';

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
