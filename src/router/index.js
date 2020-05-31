import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/mainPage'

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
    routes: [{
            path: '/',
            name: 'mainPage',
            component: MainPage
            // children: pages
        }
    ]
})
export default router