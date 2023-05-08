import { addressRequest } from '~/utils/request';
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from '../Constants/AddressConstants';

export const getListAddress = (handleSuccessGetAddress) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_REQUEST });
        const { data } = await addressRequest.get('/');
        if (handleSuccessGetAddress) {
            handleSuccessGetAddress(data);
        }
        dispatch({ type: ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
