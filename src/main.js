import { createApp } from 'vue'
import App from './App.vue'
import VueParticles from 'vue-particles'
require('@/assets/main.scss');

import router from './routers'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'
// axios.defaults.baseURL = 'http://202.193.52.185:8080/'
// axios.defaults.baseURL = 'http://web118.vipgz6.91tunnel.com/'

createApp(App).use(VueParticles).use(store).use(router, axios).mount('#app')
