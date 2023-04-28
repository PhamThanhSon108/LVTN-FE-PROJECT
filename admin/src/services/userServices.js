import axios from 'axios';
import { API_FASHIONSHOP } from '../utils/request';

const verifyRefreshToken = async (refreshToken) => {
  return axios.post(`${API_FASHIONSHOP}users/refresh-token`, { refreshToken });
};

export { verifyRefreshToken };
