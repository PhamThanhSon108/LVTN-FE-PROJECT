import axios from 'axios';
import { onResponseError, onResponseSuccess } from './refreshToken';

const getToken = () => {
  return `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
};

export const API_FASHIONSHOP = 'https://d760-14-169-150-224.ngrok-free.app/api/v1/';
const request = axios.create({
  baseURL: API_FASHIONSHOP,
  headers: {
    authorization: getToken(),
  },
});
request.interceptors.response.use(onResponseSuccess, onResponseError);
export default request;
