import axios from 'axios';
const request = axios.create({
  // baseURL: 'https://fashion-shop-v1.herokuapp.com/',
  baseURL: 'https://apifashionshop.nkt2001.tech/',
});

export default request;
