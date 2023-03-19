import axios from 'axios';
const getToken = () => {
    return `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
};
const API_FASHIONSHOP = 'https://api.fashionshop.nkt2001.tech/api/v1/';
const request = axios.create({
    baseURL: API_FASHIONSHOP,
    headers: {
        authorization: getToken(),
    },
});

export const addressRequest = axios.create({
    baseURL: 'https://provinces.open-api.vn/api',
    params: { depth: 3 },
});
export default request;
