import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.yulda24.uz',
  baseURL: 'http://localhost:2000',
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error.message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
