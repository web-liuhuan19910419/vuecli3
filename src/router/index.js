import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/mainPage' // 基本布局
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index'),
            hidden: true,
            name: 'login',
            meta: {requiresAuth: false, keepAlive: false}
        },
        {
            path: '/404',
            component: () => import('@/views/404'),
            hidden: true,
            meta: {requiresAuth: false, keepAlive: false}
        },
        { 
            path: '/home',
            component: MainPage,
            children: [
                {
                  path: 'index',
                  name: 'home',
                  component: () => import('@/views/homePage/index'),
                  meta: {requiresAuth: false, keepAlive: false}
                }
              ]
        },
        { 
            path: '/table',
            component: MainPage,
            children: [
                {
                  path: '/index1',
                  name: 'table1',
                  component: () => import('@/views/table/index1.vue'),
                  meta: {requiresAuth: false, keepAlive: false}
                }
            ]
        },
        { 
            path: '/table',
            component: MainPage,
            children: [
                {
                  path: '/index2',
                  name: 'table2',
                  component: () => import('@/views/table/index2.vue'),
                  meta: {requiresAuth: false, keepAlive: false}
                }
            ]
        }
    ]
})




export default router