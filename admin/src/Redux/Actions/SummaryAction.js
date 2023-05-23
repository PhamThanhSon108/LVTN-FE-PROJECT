import request from '../../utils/request';
import { SUMMARY_FAIL, SUMMARY_REQUEST, SUMMARY_SUCCESS } from '../Constants/SummaryConstants';

export const getSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SUMMARY_REQUEST });
    const { data } = await request.get(`/common/summary`);
    dispatch({
      type: SUMMARY_SUCCESS,
      payload: data?.data || { totalOrder: 0, totalProduct: 0, totalRevenue: 0, totalUser: 0 },
    });
  } catch (error) {
    dispatch({
      type: SUMMARY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
