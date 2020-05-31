
const globalConst = {
    clientWidth: () => {
      return document.documentElement.clientWidth
    },
    clientHeight: () => {
      // return 1009
      // return window.screen.availHeight
      return document.documentElement.clientHeight
      // return window.innerHeight
    },
    headComponentHeight: 60,
    footComponentHeight: 0,
    quickTabComponentHeight: 40,
    quickTabComponentBottomHeight: 0,
    contentWidth: 990,
    menuComponentWidth: 200,
    // 与侧边栏结合在主页面刷新数据.
    refresh: 'Refresh',
    getShowWindowHeight (itemCount, hasPageSwitch, hasTabComponent) {
      if (hasPageSwitch) {
        return this.clientHeight() - this.headComponentHeight - this.footComponentHeight - (hasTabComponent ? (this.quickTabComponentHeight + this.quickTabComponentBottomHeight) : 0) - itemCount * 40 - 45 - 10 - 1 - 1
      } else {
        return this.clientHeight() - this.headComponentHeight - this.footComponentHeight - (hasTabComponent ? (this.quickTabComponentHeight + this.quickTabComponentBottomHeight) : 0) - itemCount * 40 - 10 - 1 - 1
      }
    },
    getShowMainWindowHeight () {
      return this.clientHeight() - this.headComponentHeight - this.footComponentHeight - 10 - 1
    },
    getShowMenuHeight () {
      return this.clientHeight() - this.headComponentHeight - this.footComponentHeight - 1
    }
  }
  
  export default globalConst
  