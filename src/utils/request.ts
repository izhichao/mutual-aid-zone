import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mock.lbviic.com/mock/14',
  timeout: 3000
});

// // 请求拦截
// instance.interceptors.request.use((config) => {
//   return config;
// });

// // 响应拦截
// instance.interceptors.response.use((config) => {
//   return config;
// });

export default instance;
