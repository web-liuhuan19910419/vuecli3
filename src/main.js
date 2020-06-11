import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import '@/assets/css/global.scss' /*引入公共样式*/
import ElementUI from 'element-ui'
import '@/assets/css/element-variable.scss'
import globalConst from './utils/const/globalConst.js' // 一些固定数值(主要是样式布局上面的一些长度和高度)
import menuList from './utils/const/menuList.js' // 一些固定数值(主要是样式布局上面的一些长度和高度)
Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
Vue.prototype.$menuList = menuList
Vue.use(ElementUI, {size: 'mini', zIndex: 9000})
router.beforeEach((to, from, next) => { // 路由拦截，未登陆或者权限配置
    console.log(store.state.UserToken)
    console.log(to.matched)
    console.log(localStorage.getItem('UserToken'))
    if (localStorage.getItem('UserToken') === null) { // 用户没有登录
        if (to.path === '/login') {
            console.log('1111111')
            next();
          } else {
            console.log('22222')
            next('/login');
          }
    } else {
      console.log('进来到这个路由')
      next()
    }
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')