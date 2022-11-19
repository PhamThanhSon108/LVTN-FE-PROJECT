import axios from 'axios';
const request = axios.create({
  baseURL: 'https://fashion-shop-v1.herokuapp.com/',
});

export default request;
