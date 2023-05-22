import {
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
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
    PRODUCT_SIMILAR_FAIL,
    PRODUCT_SIMILAR_SUCCESS,
    PRODUCT_SIMILAR_REQUEST,
} from '../Constants/ProductConstants';
import { logout } from './userActions';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/components/LoadingError/Toast';
import { getProducts } from '~/services/productService';
// PRODUCT LIST ALL
export const ListProductAll = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_ALL_REQUEST });
        const { data } = await request.get(`/products`);
        dispatch({ type: PRODUCT_LIST_ALL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
// PRODUCT LIST
export const listProduct =
    ({
        category = '',
        keyword = '',
        pageNumber = '',
        rating = '',
        minPrice = '',
        maxPrice = '',
        sortBy = '',
        limit = 24,
    }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await getProducts({
                category,
                keyword,
                pageNumber,
                rating,
                minPrice,
                maxPrice,
                sortBy,
                limit,
            });
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

export const getSimilarProduct =
    ({ id = '', category = '', pageNumber = '', pageSize = 12 }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_SIMILAR_REQUEST });
            const { data } = await getProducts({
                category,
                pageNumber,
                pageSize,
            });
            const productsObject = {
                ...data?.data,
                products: data?.data?.products?.filter((product) => product?._id !== id),
            };
            dispatch({ type: PRODUCT_SIMILAR_SUCCESS, payload: productsObject });
        } catch (error) {
            dispatch({
                type: PRODUCT_SIMILAR_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

// SINGLE PRODUCT
export const listProductDetails = (id, handleAfterFetch) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await request.get(`/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
        handleAfterFetch?.success(data.data?.product?.category?.slug);
    } catch (error) {
        handleAfterFetch?.error();
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
    ({ id, review, onHide }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
            await request.post(`/products/${id}/review`, review);
            onHide && onHide('displayBasic');
            toast.success('Đánh giá sản phẩm thành công', Toastobjects);
            dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            toast.error(message, Toastobjects);

            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: message,
            });
        }
    };

export const createProductReviewByOrder =
    ({ OrderId, OrderItemId, ProductId, review, onHide }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
            await request.post(`/order/${OrderId}/orderItem/${OrderItemId}/products/${ProductId}`, review);
            onHide && onHide('displayBasic');
            toast.success('Đánh giá sản phẩm thành công', Toastobjects);
            dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            toast.error(message, Toastobjects);

            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: message,
            });
        }
    };
