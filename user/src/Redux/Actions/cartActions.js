import { toast } from 'react-toastify';
import { addProductToCart, getListCart, removeFromCart } from '~/services/cartServices';
import { clearLocalStorage, getItemFromLocalstorage, setLocalStorage } from '~/utils/localStorage';
import CART_CONST from '../Constants/CartConstants';
import { logout } from './userActions';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export const listCart = () => async (dispatch) => {
    try {
        dispatch({ type: CART_CONST?.CART_LIST_REQUEST });
        const { data } = getListCart();
        setLocalStorage('cartItems', data);
        dispatch({ type: CART_CONST?.CART_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CART_CONST?.CART_LIST_FAIL,
            payload: message,
        });
    }
};
//ADD TO CART NEW
export const addToCart = (variantId, qty, setLoadingAddtoCart) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_CONST?.CART_CREATE_REQUEST });
        const { data } = addProductToCart({ variantId, quantity: qty });
        toast.success('Product added to cart', Toastobjects);
        setLoadingAddtoCart(false);
        dispatch({ type: CART_CONST?.CART_CREATE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        setLoadingAddtoCart(false);
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_CONST?.CART_CREATE_FAIL,
            payload: message,
        });

        toast.error(message, { ...Toastobjects, autoClose: 3000 });
    }
};

export const updateCart =
    ({ variantId, qty, setCartChoise, setLoadingIndices, updateCart }) =>
    async (dispatch) => {
        try {
            dispatch({ type: CART_CONST?.CART_UPDATE_REQUEST });
            const { data } = await updateCart({ variantId, quantity: qty });
            if (updateCart == true && data)
                setCartChoise((pre) => {
                    if (pre[variantId] !== undefined) pre[variantId].quantity = qty;
                    return { ...pre };
                });
            dispatch({ type: CART_CONST?.CART_UPDATE_SUCCESS });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            setLoadingIndices(null);
            toast.error(message, { ...Toastobjects, autoClose: 3000 });
            dispatch({
                type: CART_CONST?.CART_CREATE_FAIL,
                payload: message,
            });
        }
    };

// REMOVE PRODUCT FROM CART
export const removefromcart =
    ({ id, setCartChoise, deleteCartOnly, deleteCartAll }) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: CART_CONST?.CART_DELETE_REQUEST });
            const { data } = await removeFromCart(id);
            if (deleteCartOnly === true && data)
                setCartChoise((pre) => {
                    delete pre[id[0]];
                    return { ...pre };
                });
            else {
                if (data && deleteCartAll === true) setCartChoise([]);
            }
            dispatch({ type: CART_CONST?.CART_DELETE_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: CART_CONST?.CART_DELETE_FAIL,
                payload: message,
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    };

//Delete all item from cart
export const clearFromCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_CONST?.CART_ORDER_RESET });
        clearLocalStorage('cartOrderItems');
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
    }
    setLocalStorage('cartOrderItems', getState().cart.cartItems);
};
// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    setLocalStorage('shippingAddress', data);
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    setLocalStorage('paymentMethod', data);
};

export const addProductOrderInCart = (data) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_ADD_PRODUCT_ORDER_SUCCESS,
        payload: data,
    });
    setLocalStorage('cartOrderItems', data);
};

export const listOrderCart = () => async (dispatch, getState) => {
    try {
        const data = getItemFromLocalstorage('cartOrderItems');
        dispatch({ type: CART_CONST?.CART_ADD_PRODUCT_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CART_CONST?.CART_LIST_FAIL,
            payload: message,
        });
    }
};
