import {
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ALL_FAIL,
    PRODUCT_LIST_ALL_REQUEST,
    PRODUCT_LIST_ALL_SUCCESS,
    PRODUCT_SIMILAR_REQUEST,
    PRODUCT_SIMILAR_SUCCESS,
    PRODUCT_SIMILAR_FAIL,
} from '../Constants/ProductConstants';

//PRODUCT LIST ALL
export const productListAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_ALL_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_LIST_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload?.products || [],
            };
        case PRODUCT_LIST_ALL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// SINGLE PRODUCT
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload.product };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

export const similarProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SIMILAR_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_SIMILAR_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
            };
        case PRODUCT_SIMILAR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
