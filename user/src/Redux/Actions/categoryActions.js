import { getCategories } from '~/services/categoryServices';
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from '../Constants/CategoryConstants';

export const ListCategory = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });
        const { data } = await getCategories();
        dispatch({ type: CATEGORY_SUCCESS, payload: data?.data?.categories });
    } catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
