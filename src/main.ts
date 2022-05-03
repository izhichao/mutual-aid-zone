import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import { AxiosStatic } from 'axios';
import Vant from 'vant';
import 'normalize.css';
import 'vant/lib/index.css';
import './style/index.less';

const app = createApp(App);
const pinia = createPinia();
axios.defaults.baseURL = 'http://192.168.43.2:7001';
app.config.globalProperties.$http = axios;

app.use(router);
app.use(pinia);
app.use(Vant);
app.mount('#app');

// 声明axios类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: AxiosStatic;
  }
}
