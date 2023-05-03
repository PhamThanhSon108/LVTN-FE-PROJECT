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

export const AddressReducer = (state = { address: { provinces: [], districts: [], wards: [] } }, action) => {
    switch (action.type) {
        //province
        case ADDRESS_PROVINCE_LIST_REQUEST:
            return { loadingProvinces: true, address: { ...state.address } };
        case ADDRESS_PROVINCE_LIST_SUCCESS:
            return {
                loadingProvinces: false,
                address: { provinces: action.payload, wards: [], districts: [] },
            };
        case ADDRESS_PROVINCE_LIST_FAIL:
            return { ...state, loadingProvinces: false, error: action.payload };

        //district
        case ADDRESS_DISTRICT_LIST_REQUEST:
            return { loadingDistricts: true, address: { ...state.address, districts: [], wards: [] } };
        case ADDRESS_DISTRICT_LIST_SUCCESS:
            return {
                loadingDistricts: false,
                address: { ...state.address, districts: action.payload, wards: [] },
            };
        case ADDRESS_DISTRICT_LIST_FAIL:
            return { ...state, loadingDistricts: false, error: action.payload };

        //ward
        case ADDRESS_WARD_LIST_REQUEST:
            return { loadingWards: true, address: { ...state.address, wards: [] } };
        case ADDRESS_WARD_LIST_SUCCESS:
            return {
                loadingWards: false,
                address: { ...state.address, wards: action.payload },
            };
        case ADDRESS_WARD_LIST_FAIL:
            return { ...state, loadingWards: false, error: action.payload };

        default:
            return state;
    }
};
