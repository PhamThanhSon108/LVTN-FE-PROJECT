import CART_CONST from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_CONST?.CART_LIST_REQUEST:
            const newCart = state?.cartItems?.length != 0 ? state?.cartItems : [];
            return { loading: true, cartItems: newCart };
        case CART_CONST?.CART_LIST_SUCCESS:
            return { loading: false, cartItems: action.payload };
        case CART_CONST?.CART_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CART_CONST?.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_CONST?.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CART_CONST?.CART_LIST_MY_RESET:
            return { cartItems: [] };
        default:
            return state;
    }
};

export const DeleteCartReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CONST?.CART_DELETE_REQUEST:
            return { loading: true };
        case CART_CONST?.CART_DELETE_SUCCESS:
            return { loading: false, success: true, message: action.payload };
        case CART_CONST?.CART_DELETE_FAIL:
            return { loading: false, error: true };
        case CART_CONST?.CART_CLEAR_SUCCESS:
            return { loading: false, success: true };
        default:
            return state;
    }
};

export const CreateCartReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CONST?.CART_CREATE_REQUEST:
            return { loading: true };
        case CART_CONST?.CART_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case CART_CONST?.CART_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const UpdateCartReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_CONST?.CART_UPDATE_REQUEST:
            return { loading: true };
        case CART_CONST?.CART_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case CART_CONST?.CART_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CART_CONST?.CART_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const CartOrderReducer = (state = { cartOrderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_CONST?.CART_ADD_PRODUCT_ORDER_REQUEST:
            return { ...state, loading: true };
        case CART_CONST?.CART_ADD_PRODUCT_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                cartOrderItems: action.payload,
            };
        case CART_CONST?.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_CONST?.CART_ADD_PRODUCT_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CART_CONST?.CART_ORDER_RESET:
            return { cartOrderItems: [], shippingAddress: {} };
        default:
            return state;
    }
};
