import { createApp } from 'vue'
import App from './App.vue'
import VueParticles from 'vue-particles'
require('@/assets/main.scss');

import router from './routers'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
axios.defaults.baseURL = 'http://192.168.1.108:8080/'
// axios.defaults.baseURL = 'http://202.193.52.185:8080/'
// axios.defaults.baseURL = 'http://web118.vipgz6.91tunnel.com/'

createApp(App).use(ElementPlus).use(VueParticles).use(store).use(router, axios).mount('#app')
