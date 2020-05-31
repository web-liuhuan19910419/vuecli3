import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.scss' /*引入公共样式*/
import globalConst from './utils/const/globalConst.js' // 一些固定数值(主要是样式布局上面的一些长度和高度)
import menuList from './utils/const/menuList.js' // 一些固定数值(主要是样式布局上面的一些长度和高度)
Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
Vue.prototype.$menuList = menuList
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')