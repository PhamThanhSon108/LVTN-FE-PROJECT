import axios from 'axios';
const request = axios.create({
    // baseURL: 'https://fashion-shop-v1.herokuapp.com/',
    baseURL: 'http://localhost:5000/',
});

export const addressRequest = axios.create({
    baseURL: 'https://provinces.open-api.vn/api/',
});
export default request;
