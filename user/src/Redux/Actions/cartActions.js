import { toast } from 'react-toastify';
import { addProductToCart, getListCart, removeFromCart, updateCartService } from '~/services/cartServices';
import { clearLocalStorage, getItemFromLocalstorage, setLocalStorage } from '~/utils/localStorage';
import CART_CONST from '../Constants/CartConstants';
import { logout } from './userActions';

export const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export const listCart = () => async (dispatch) => {
    try {
        dispatch({ type: CART_CONST?.CART_LIST_REQUEST });
        const { data } = await getListCart();
        setLocalStorage('cartItems', data?.data?.cartItems);
        dispatch({ type: CART_CONST?.CART_LIST_SUCCESS, payload: data?.data?.cartItems });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CART_CONST?.CART_LIST_FAIL,
            payload: message,
        });
    }
};
//ADD TO CART NEW
export const addToCart =
    ({
        variantId,
        qty,
        handleOnFinallAddProductToCart,
        handleOnSuccessAddProductToCart,
        handleOnErrorAddProductToCart,
    }) =>
    async (dispatch) => {
        try {
            dispatch({ type: CART_CONST?.CART_CREATE_REQUEST });
            await addProductToCart({ variantId, quantity: qty.toString() });
            await handleOnSuccessAddProductToCart();
            dispatch({ type: CART_CONST?.CART_CREATE_SUCCESS });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            await handleOnErrorAddProductToCart({ message });
        } finally {
            await handleOnFinallAddProductToCart();
        }
    };

export const updateCart =
    ({ variantId, qty, setCartChoise, setLoadingIndices, updateCart }) =>
    async (dispatch) => {
        try {
            dispatch({ type: CART_CONST?.CART_UPDATE_REQUEST });
            const { data } = await updateCartService({ variantId, quantity: qty });
            if (updateCart == true && data)
                setCartChoise((pre) => {
                    if (pre[variantId] !== undefined) pre[variantId].quantity = qty;
                    return { ...pre };
                });
            dispatch({ type: CART_CONST?.CART_UPDATE_SUCCESS });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
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
    }
    setLocalStorage('cartOrderItems', getState().cart.cartItems);
};
// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data, handleSaveAddressSuccess) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    setLocalStorage('shippingAddress', data);
    if (handleSaveAddressSuccess) {
        handleSaveAddressSuccess();
    }
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    setLocalStorage('paymentMethod', data);
};

export const addProductOrderInCart = (data, handleAfterFetch) => (dispatch) => {
    dispatch({
        type: CART_CONST?.CART_ADD_PRODUCT_ORDER_SUCCESS,
        payload: data,
    });
    handleAfterFetch?.success();
    setLocalStorage('cartOrderItems', data);
};

export const listOrderCart = () => async (dispatch, getState) => {
    try {
        const data = getItemFromLocalstorage('cartOrderItems');
        dispatch({ type: CART_CONST?.CART_ADD_PRODUCT_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CART_CONST?.CART_LIST_FAIL,
            payload: message,
        });
    }
};
