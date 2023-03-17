import axios from 'axios';
const getToken = () => {
  console.log('get token');
  return `Bearer ${localStorage.getItem('userInfo')?.accessToken}`;
};
const request = axios.create({
  // baseURL: 'https://fashion-shop-v1.herokuapp.com/',
  baseURL: 'https://api.fashionshop.nkt2001.tech/api/v1/',
  headers: {
    authorization: getToken(),
  },
});

export default request;
