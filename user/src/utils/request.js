import axios from 'axios';
import { onResponseError, onResponseSuccess } from './refreshToken';

const getToken = () => {
    return `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
};

export const API_FASHIONSHOP = 'http://localhost:5000/api/v1/';
// export const API_FASHIONSHOP = 'https://api.fashionshop.nkt2001.tech/api/v1/';
const request = axios.create({
    baseURL: API_FASHIONSHOP,
    headers: {
        authorization: getToken(),
    },
});
request.interceptors.response.use(onResponseSuccess, onResponseError);
export const addressRequest = axios.create({
    baseURL: 'https://provinces.open-api.vn/api',
    params: { depth: 3 },
});
export default request;
