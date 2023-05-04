import { USER_INFO_KEY } from '~/constant/locaStorageConstants';
import { getItemFromLocalstorage, getRefreshToken, setLocalStorage } from './localStorage';
import { verifyRefreshToken } from '~/services/userServices';

// hàm để refresh token
const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        localStorage.removeItem(USER_INFO_KEY);
        window.location.assign('./login');
        return;
    }
    try {
        const { data } = await verifyRefreshToken(refreshToken);
        const userInfo = getItemFromLocalstorage(USER_INFO_KEY);
        setLocalStorage(USER_INFO_KEY, {
            ...userInfo,
            accessToken: data?.data.accessToken,
            refreshToken: data?.data.refreshToken,
        });
    } catch (error) {
        localStorage.removeItem(USER_INFO_KEY);
        window.location.assign('./login');
    }
};

const onResponseSuccess = (response) => {
    // return response;
    return response;
};
const onResponseError = (error) => {
    if (error.response?.status !== 401 || window.location.pathname === '/login') {
        const errMessage = error.response?.data || error?.response || error;
        return Promise.reject(errMessage);
    }
    return refreshToken(error); // gọi hàm để refresh token.
};

export { onResponseError, onResponseSuccess };
