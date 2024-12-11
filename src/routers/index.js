import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomePage.vue'
import TestCom from "@/views/TestCom.vue";
import LogIn from '../views/LogIn.vue'
import Cart from '../views/CartPage.vue'
import Order from '../views/OrderPage.vue'
import SignUp from '@/views/SignUp.vue'
import ProductDetail from '@/components/ProductDetail.vue';


const routers = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/test',
        name: 'test',
        component: TestCom
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/order',
        name: 'Order',
        component: Order
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
    },
]

var router = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default router