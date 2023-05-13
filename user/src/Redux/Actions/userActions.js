import {
    ADD_SHIPPING_ADDRESS_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SHIPPING_ADDRESS_FAIL,
    SHIPPING_ADDRESS_REQUEST,
    SHIPPING_ADDRESS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_VERIFY,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from '../Constants/UserContants';
import { ORDER_LIST_MY_RESET } from '../Constants/OrderConstants';
import CART_CONST from '../Constants/CartConstants';
import { toast } from 'react-toastify';
import request from '../../utils/request';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await request.post(`/users/login`, { email, password });
        localStorage.setItem(
            'userInfo',
            JSON.stringify({
                ...data?.data.user,
                refreshToken: data?.data.refreshToken,
                accessToken: data?.data.accessToken,
            }),
        );
        window.location.href = '/';
        await dispatch({ type: USER_LOGIN_SUCCESS, payload: data?.data.user });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message,
        });
        toast.error(message, Toastobjects);
    }
};

// LOGOUT
export const logout = () => (dispatch) => {
    try {
        setTimeout(() => {
            dispatch({ type: USER_LOGIN_REQUEST });
        }, 100);
        setTimeout(() => {
            localStorage.removeItem('userInfo');
            dispatch({ type: USER_LOGOUT });
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: ORDER_LIST_MY_RESET });
            dispatch({ type: CART_CONST?.CART_LIST_MY_RESET });
        }, 500);
    } catch (error) {
        toast.error(
            error.response && error.response.data.message ? error.response.data.message : error.message,
            Toastobjects,
        );
    }
};

// REGISTER
export const register = (history, name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await request.post(`/users/register`, {
            name,
            email,
            password,
            phone,
            confirmPassword: password,
        });
        dispatch({ type: USER_REGISTER_VERIFY });
        history.push(`/register/verify?email=${email}`);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: message,
        });
        toast.error(message, Toastobjects);
    }
};

export const confirmRegister = (verifyEmail, history) => async (dispatch) => {
    try {
        await request.patch(`/users/auth/verify-email?emailVerificationToken=${verifyEmail}`);
        toast.success('Register success', Toastobjects);
        localStorage.removeItem('userInfo');
        setTimeout(() => {
            history.push('/login');
        }, 2000);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        toast.error(message, Toastobjects);
        setTimeout(() => {
            history.push('/login');
        }, 2000);
    }
};

export const cancelRegister = (verifyEmail, history) => async (dispatch) => {
    try {
        const { data } = await request.patch(`/users/auth/cancel-verify-email?emailVerificationToken=${verifyEmail}`);
        localStorage.removeItem('userInfo');
        history.push('/login');
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        setTimeout(() => {
            history.push('/login');
        }, 2000);
    }
};

export const forGotPassWord = (data, handleAfterFetch) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const apiData = await request.patch(`/users/auth/forgot-password`, { email: data.emailReset });
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: apiData });
        handleAfterFetch.success();
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        toast.error(message, Toastobjects);
    }
};

export const resetPassWord = (resetPasswordToken, data, history) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const dataApi = await request.patch(`/users/auth/reset-password?resetPasswordToken=${resetPasswordToken}`, {
            ...data,
        });
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: dataApi });
        toast.success('Reset is success', Toastobjects);
        localStorage.removeItem('userInfo');
        setTimeout(() => {
            history.push('/login');
        }, 1500);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: message,
        });
        toast.error(message, Toastobjects);
    }
};

// USER DETAILS
export const getUserDetails = (id, setLoadingFetchUserShipping) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await request.get(`/users/${id}`);
        setLoadingFetchUserShipping && setLoadingFetchUserShipping(false);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data?.data?.user });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        setLoadingFetchUserShipping && setLoadingFetchUserShipping(false);

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// UPDATE PROFILE
export const updateUserProfile = (user, history, setLoading) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { data } = await request.put(`/users/profile`, user);

        toast.success('Profile Updated', Toastobjects);
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: { ...data?.data.user, accessToken: data?.data.accessToken },
        });

        if (setLoading) setLoading(false);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        // dispatch({
        //     type: USER_UPDATE_PROFILE_FAIL,
        //     payload: message,
        // });
        toast.error(message, Toastobjects);
        if (setLoading) setLoading(false);
    }
};

export const updateUserPassword = (user, handleSuccessUpdatePassword) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const { data } = await request.patch(`/users/auth/change-password`, user);
        dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: { ...userInfo, accessToken: userInfo.accessToken } });
        if (handleSuccessUpdatePassword) {
            handleSuccessUpdatePassword();
        }
        toast.success('Update password success', Toastobjects);
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, accessToken: data.token }));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
        toast.error(message, Toastobjects);
    }
};

export const getShippingAddresses = (handleAfterFetchAddress) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHIPPING_ADDRESS_REQUEST });
        const { data } = await request.get(`/users/address/get-user-address-list`);
        handleAfterFetchAddress?.success(data?.data?.addressList.find((address) => address?.isDefault));
        dispatch({ type: SHIPPING_ADDRESS_SUCCESS, payload: data?.data?.addressList || [] });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: SHIPPING_ADDRESS_FAIL,
            payload: message,
        });
    }
};

export const AddShippingAddress =
    (
        address = {
            province: {
                id: '',
                name: '',
            },
            district: {
                id: '',
                name: '',
            },
            ward: {
                id: '',
                name: '',
            },
            name: '',
            phone: '',
            specificAddress: '',
            isDefault: false,
            _id: '',
        },
        handleAfterFetch = {},
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: SHIPPING_ADDRESS_REQUEST });
            const { data } = await request.post(`/users/address/add-user-address`, address);
            handleAfterFetch.success('Thêm địa chỉ giao hàng thành công');
            dispatch({ type: SHIPPING_ADDRESS_SUCCESS, payload: data?.data?.addressList || [] });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            handleAfterFetch.error(message);
            dispatch({
                type: SHIPPING_ADDRESS_FAIL,
                payload: message,
            });
        }
    };

export const UpdateShippingAddress =
    (
        id,
        address = {
            province: {
                id: '',
                name: '',
            },
            district: {
                id: '',
                name: '',
            },
            ward: {
                id: '',
                name: '',
            },
            name: '',
            phone: '',
            specificAddress: '',
            isDefault: false,
            _id: '',
        },
        handleAfterFetch = {},
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: SHIPPING_ADDRESS_REQUEST });
            const { data } = await request.put(`/users/address/${id}/update-user-address`, address);
            handleAfterFetch.success('Cập nhật địa chỉ giao hàng thành công');
            dispatch({ type: SHIPPING_ADDRESS_SUCCESS, payload: data?.data?.addressList || [] });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            handleAfterFetch.error(message);
            dispatch({
                type: SHIPPING_ADDRESS_FAIL,
                payload: message,
            });
        }
    };

export const RemoveShippingAddress =
    (id, handleAfterFetch = {}) =>
    async (dispatch) => {
        try {
            dispatch({ type: SHIPPING_ADDRESS_REQUEST });
            const { data } = await request.delete(`/users/address/${id}/remove-user-address`);
            handleAfterFetch.success('Xóa địa chỉ giao hàng thành công');
            dispatch({ type: SHIPPING_ADDRESS_SUCCESS, payload: data?.data?.addressList || [] });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            handleAfterFetch.error(message);
            dispatch({
                type: SHIPPING_ADDRESS_FAIL,
                payload: message,
            });
        }
    };
