import { createApp } from 'vue'
import App from './App.vue'
import VueParticles from 'vue-particles'
require('@/assets/main.scss');

import router from './routers'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import player from './plugins/autoload'
axios.defaults.baseURL = 'http://localhost:8090/'
// axios.defaults.baseURL = 'http://10.34.35.54:8090/'
// axios.defaults.baseURL = 'http://web118.vipgz6.91tunnel.com/'

createApp(App).use(ElementPlus).use(player).use(VueParticles).use(store).use(router, axios).mount('#app')
