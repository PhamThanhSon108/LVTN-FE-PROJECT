import { USER_INFO_KEY } from '~/constant/locaStorageConstants';
import { getItemFromLocalstorage, getRefreshToken, setLocalStorage } from './localStorage';
import { verifyRefreshToken } from '~/services/userServices';
import axios from 'axios';
import request from './request';
var requestTimes = 0;
// hàm để refresh token
const refreshToken = async (error) => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        localStorage.removeItem(USER_INFO_KEY);
        window.location.assign('/login');
        return;
    }
    try {
        const { data } = await verifyRefreshToken(refreshToken);
        setLocalStorage(USER_INFO_KEY, {
            accessToken: data?.data.accessToken,
            refreshToken: data?.data.refreshToken,
        });
        let config = error.config;

        await axios({
            ...config,
            headers: {
                Authorization: `Bearer ${data?.data.accessToken}`,
            },
        });
        requestTimes = 0;
        window.location.reload();
    } catch (error) {
        localStorage.removeItem(USER_INFO_KEY);
        window.location.assign('/login');
    }
};

const onResponseSuccess = (response) => {
    // return response;
    return response;
};
const onResponseError = (error) => {
    const tokenToRefresh = getRefreshToken();

    if (error.response?.status !== 401 || !tokenToRefresh) {
        const errMessage = error.response?.data || error?.response || error;
        return Promise.reject(errMessage);
    }
    requestTimes = requestTimes + 1;
    if (requestTimes === 1) {
        return refreshToken(error); // gọi hàm để refresh token.
    }
};

export { onResponseError, onResponseSuccess };
