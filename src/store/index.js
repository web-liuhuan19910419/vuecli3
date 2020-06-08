import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    get UserToken() {
        return localStorage.getItem('token')
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },
    count: 0,
    flag: false,
    activeIndexPath: '' // 侧边栏导航默认激活的路由路径
  }
  
  const mutations = {
    plusMutation (state, obj) {
      state.count += obj.a
    },
    minusMutation (state) {
      state.count--
    },
    changeFlagTrue (state) {
      state.flag = true
    },
    changeFlagFalse (state) {
      state.flag = false
    },
    changeActiveIndex (state, path) {
        state.activeIndexPath = path
    }
  }
  
  const getters = {
    count: function (state) {
      let newCount = state.count += 0
      return newCount
    }
  }
  
  const actions = {
    plusAction (context) {
      context.commit('plusMutation', {a: 2})
      setTimeout(() => {
        context.commit('minusMutation')
      }, 3000)
    },
    minusAction ({commit}) {
      commit('minusMutation')
    }
  }
  
  export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: { // 一些外挂的module
    },
    plugins: [] // 外挂的plugin
  })