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
