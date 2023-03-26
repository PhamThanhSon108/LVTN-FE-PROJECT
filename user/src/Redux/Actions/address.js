import { addressRequest } from '~/utils/request';
import AddressConstants from '../Constants/AddressConstants';

export const getListAddress = (handleSuccessGetAddress) => async (dispatch) => {
    try {
        dispatch({ type: AddressConstants.ADDRESS_REQUEST });
        const { data } = await addressRequest.get('/');
        if (handleSuccessGetAddress) {
            handleSuccessGetAddress(data);
        }
        dispatch({ type: AddressConstants.ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: AddressConstants.ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
