import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router.js'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = "http://127.0.0.1:7001"
app.config.globalProperties.$http = axios

app.use(router)
app.mount('#app')