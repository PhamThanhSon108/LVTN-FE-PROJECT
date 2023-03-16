import axios from 'axios';
const request = axios.create({
  // baseURL: 'https://fashion-shop-v1.herokuapp.com/',
  baseURL: 'https://api.fashionshop.nkt2001.tech/api/v1/',
});

export default request;
