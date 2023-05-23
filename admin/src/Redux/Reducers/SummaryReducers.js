import { SUMMARY_FAIL, SUMMARY_REQUEST, SUMMARY_SUCCESS } from '../Constants/SummaryConstants';

export const summaryReducer = (state = {}, action) => {
  switch (action.type) {
    case SUMMARY_REQUEST:
      return { loading: true };
    case SUMMARY_SUCCESS:
      return { loading: false, success: true, summary: action.payload };
    case SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
