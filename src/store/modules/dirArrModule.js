const state = {
    // Dir 数组内容.
  dirArr: [],
  // Dir 内最后内容.
  lastContent: '',
  // 带有多选状态的公共数据
  mutiCheckedArray: [],
  // 记住商品列表里面的选中数据
  productListHistoryChecked: [],
  // 记住库存管理里面发货选中数据
  stockManageListHistoryChecked: []
}
const mutations = {
    configStockManageListHistoryChecked (state, item) {
      if (item !== undefined) {
        state.stockManageListHistoryChecked.push(item)
      }
    },
    configInitStockManageListHistoryChecked (state) {
      state.stockManageListHistoryChecked = []
    },
    configProductListHistoryChecked (state, item) {
      if (item !== undefined) {
        state.productListHistoryChecked.push(item) // 读取的时候说state.productListHistoryChecked是undefined
      }
    },
    configInitProductListHistoryChecked (state) { // 清空数据
      state.productListHistoryChecked = []
      console.log(state.productListHistoryChecked)
    },
    configMutiCheckedArray (state, arr) {
      state.mutiCheckedArray = arr
    },
    configDirArrMutation (state, arr) {
      if (arr.length !== 0) {
        state.dirArr = arr
      }
    },
    showDirArrMutation (state) {
      return state.dirArr
    },
    configLastContentMutation (state, content) {
      if (content !== null) {
        state.lastContent = content
      }
    }
  }
  
  const actions = {
    showDirArrAction ({commit}) {
      commit('showDirArrMutation')
    }
  }
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations
  }