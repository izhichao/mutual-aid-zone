import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://mock.lbviic.com/mock/14',
  baseURL: 'http://localhost:8000',
  timeout: 3000
});

// 请求拦截
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

// // 响应拦截
// instance.interceptors.response.use((config) => {
//   return config;
// });

export default instance;
