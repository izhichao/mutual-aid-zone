import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import 'normalize.css';
import 'vant/lib/index.css';
import './style/index.less';

const app = createApp(App);

app.use(router);
app.use(Vant);
app.mount('#app');
