import { createApp } from 'vue';
import App from './App.vue';
import './style/index.less';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import { AxiosStatic } from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
const pinia = createPinia();
axios.defaults.baseURL = 'http://127.0.0.1:7001';
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
