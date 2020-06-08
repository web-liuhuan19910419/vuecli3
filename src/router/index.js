import Vue from 'vue'
import VueRouter from 'vue-router'
// import MainPage from '../views/mainPage' // 基本布局

Vue.use(VueRouter)

// 主页面MainPage下面的子页面
/* let pages = [
    'home',
    'prisonerManager',
    'user',
    'test'
].map(name => ({
    path: name,
    name: name,
    component: () =>
        import (`@/views/${name}`)
})) */

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index'),
            hidden: true,
            name: 'login',
            meta: {requiresAuth: false}
        },
        {
            path: '/404',
            component: () => import('@/views/404'),
            hidden: true,
            meta: {requiresAuth: false}
        },
        {
            path: '/',
            redirect: '/home',
            component: () => import('@/views/homePage/index'),
            meta: {requiresAuth: false}
        },
        {
            path: '/home',
            component: () => import('@/views/homePage/index'),
            meta: {requiresAuth: false}
        }
    ]
})




export default router