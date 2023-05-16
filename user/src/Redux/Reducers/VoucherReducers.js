import {
    PUBLIC_VOUCHER_FAIL,
    PUBLIC_VOUCHER_REQUEST,
    PUBLIC_VOUCHER_SUCCESS,
    MY_VOUCHER_FAIL,
    MY_VOUCHER_REQUEST,
    MY_VOUCHER_SUCCESS,
    ADD_VOUCHER_REQUEST,
    ADD_VOUCHER_SUCCESS,
    ADD_VOUCHER_FAIL,
} from '../Constants/VoucherConstants';

export const myVouchers = (
    state = {
        vouchers: [],
    },
    action,
) => {
    switch (action.type) {
        case MY_VOUCHER_REQUEST:
            return { ...state, loading: true };
        case MY_VOUCHER_SUCCESS:
            return {
                loading: false,
                success: true,
                vouchers: action.payload,
            };
        case MY_VOUCHER_FAIL:
            return { ...state, loading: false, success: false };
        default:
            return state;
    }
};

export const publicVouchers = (
    state = {
        vouchers: [],
    },
    action,
) => {
    switch (action.type) {
        case PUBLIC_VOUCHER_REQUEST:
            return { ...state, loading: true };
        case PUBLIC_VOUCHER_SUCCESS:
            return {
                loading: false,
                success: true,
                vouchers: action.payload,
            };
        case PUBLIC_VOUCHER_FAIL:
            return { ...state, loading: false, success: false };
        default:
            return state;
    }
};

export const addVoucher = (
    state = {
        voucher: {},
    },
    action,
) => {
    switch (action.type) {
        case ADD_VOUCHER_REQUEST:
            return { ...state, loading: true };
        case ADD_VOUCHER_SUCCESS:
            return {
                loading: false,
                success: true,
                voucher: action.payload,
            };
        case ADD_VOUCHER_FAIL:
            return { ...state, loading: false, success: false };
        default:
            return state;
    }
};
