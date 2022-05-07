import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.123.10:7300/mock/626cc63818a0b92da053b26d/api',
  timeout: 1000
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
