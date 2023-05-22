import request from '~/utils/request';
import {
    ADDRESS_DISTRICT_LIST_FAIL,
    ADDRESS_DISTRICT_LIST_REQUEST,
    ADDRESS_DISTRICT_LIST_SUCCESS,
    ADDRESS_PROVINCE_LIST_FAIL,
    ADDRESS_PROVINCE_LIST_REQUEST,
    ADDRESS_PROVINCE_LIST_SUCCESS,
    ADDRESS_WARD_LIST_FAIL,
    ADDRESS_WARD_LIST_REQUEST,
    ADDRESS_WARD_LIST_SUCCESS,
    SHIPPING_FEE_FAIL,
    SHIPPING_FEE_REQUEST,
    SHIPPING_FEE_SUCCESS,
} from '../Constants/DeliveryConstants';

export const getProvinces = (handleSuccessGetAddress) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_PROVINCE_LIST_REQUEST });
        const { data } = await request.get('/deliveries/address/province');
        if (handleSuccessGetAddress) {
            handleSuccessGetAddress(data);
        }
        dispatch({ type: ADDRESS_PROVINCE_LIST_SUCCESS, payload: data?.data?.provinces });
    } catch (error) {
        dispatch({
            type: ADDRESS_PROVINCE_LIST_FAIL.ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getDistricts = (province, handleSuccessGetAddress) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_DISTRICT_LIST_REQUEST });
        const { data } = await request.get(`/deliveries/address/${province}/district`);
        if (handleSuccessGetAddress) {
            handleSuccessGetAddress(data);
        }
        dispatch({ type: ADDRESS_DISTRICT_LIST_SUCCESS, payload: data?.data?.districts });
    } catch (error) {
        dispatch({
            type: ADDRESS_DISTRICT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getWards = (district, handleSuccessGetAddress) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_WARD_LIST_REQUEST });
        const { data } = await request.get(`/deliveries/address/${district}/ward`);
        if (handleSuccessGetAddress) {
            handleSuccessGetAddress(data);
        }
        dispatch({ type: ADDRESS_WARD_LIST_SUCCESS, payload: data?.data?.wards });
    } catch (error) {
        dispatch({
            type: ADDRESS_WARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getShippingFee =
    (
        address = {
            from_district_id: '',
            service_id: '',
            service_type_id: null,
            to_district_id: '',
            to_ward_code: '',
            height: 0,
            length: 0,
            weight: 0,
            width: 0,
            insurance_value: null,
            coupon: null,
        },
        handleAfterFetch = { success: () => {}, error: (message) => {} },
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: SHIPPING_FEE_REQUEST });
            const { data } = await request.post('/deliveries/shipping-order/services', address);
            handleAfterFetch?.success();
            dispatch({
                type: SHIPPING_FEE_SUCCESS,
                payload: data?.data?.deliveryServices || [],
            });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            handleAfterFetch?.error(message);
            dispatch({
                type: SHIPPING_FEE_FAIL,
                payload: message,
            });
        }
    };
