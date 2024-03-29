import axios from 'axios';
import { onResponseError, onResponseSuccess } from './refreshToken';

const getToken = () => {
  return `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
};

export const API_FASHIONSHOP = 'https://api.fashionshop.nkt2001.tech/api/v1/';
const request = axios.create({
  baseURL: API_FASHIONSHOP,
  headers: {
    authorization: getToken(),
  },
});
request.interceptors.response.use(onResponseSuccess, onResponseError);
export default request;
