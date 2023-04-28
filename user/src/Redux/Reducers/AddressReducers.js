import AddressConstants from '../Constants/AddressConstants';

export const AddressReducer = (state = { address: { provinces: [] } }, action) => {
    switch (action.type) {
        case AddressConstants.ADDRESS_REQUEST:
            return { loading: true, address: { ...state.address } };
        case AddressConstants.ADDRESS_SUCCESS:
            return {
                loading: false,
                address: { provinces: action.payload },
            };
        case AddressConstants.ADDRESS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
