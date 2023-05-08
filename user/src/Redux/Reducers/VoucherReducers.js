import { MY_VOUCHER_FAIL, MY_VOUCHER_REQUEST, MY_VOUCHER_SUCCESS } from '../Constants/VoucherConstants';

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
