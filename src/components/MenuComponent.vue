<template>
  <div class="menu-bg" :style="{ 'height': menuMinHeight}">
   <el-menu background-color="#ffffff" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect"  :default-active="$route.path.substr(1)" size="mini" >
    <el-submenu  v-for="(menuItem,i) in this.$menuList" :index="i.toString()" :key="menuItem.name">
     <template slot="title"><img :src="getUrl(i)" alt="" style="margin-right: 8px;">{{$t(menuItem.title)}}</template>
        <el-menu-item  v-for="(menuInfo) in menuItem.list"  :index="menuInfo.path" :key="menuInfo.name"  @click="switchToMenuListActive(menuInfo.name)">{{$t(menuInfo.name)}}</el-menu-item>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>
import vuexStorage from '../store/index.js'
export default {
  data () {
    return {
      menuMinHeight: '0px',
      defaultActive: ''
    }
  },
  methods: {
    // 获取导航左边的图片
    getUrl (i) {
      switch (i) {
        case 0 : return require('../assets/images/menu1.png')
        case 1 : return require('../assets/images/menu2.png')
        case 2 : return require('../assets/images/menu3.png')
        case 3 : return require('../assets/images/menu4.png')
        case 4 : return require('../assets/images/menu5.png')
        case 5 : return require('../assets/images/menu6.png')
        case 6 : return require('../assets/images/menu7.png')
      }
    },
    // 切换动作
    switchToMenuListActive (activeName) {
      console.log('点击这个路由' + activeName)
      if (this.$menuList.length > 0) {
        for (let index = 0; index < this.$menuList.length; index++) {
          let menuItem = this.$menuList[index]
          if (menuItem.list.length > 0) {
            for (let indexInItem = 0; indexInItem < menuItem.list.length; indexInItem++) {
              let menuInfo = menuItem.list[indexInItem]
              if (menuInfo.name === activeName) {
                menuInfo.active = true
                this.$router.push({path: menuInfo.path}) // 路由跳转
              } else {
                menuInfo.active = false
              }
            }
          }
        }
      }
    },
    homeCheckedSrc () {
      return require('../assets/images/home_checked.png')
    },
    gotoHomePage () {
      if ((this.$route.name !== 'HomePage') && (this.$route.name !== 'LoginPage')) {
        this.$router.push({name: 'HomePage'})
      }
    },
    configChecked (dirArr, currentName) {
      let isChecked = false
      for (let index = 0; index < dirArr.length; index++) {
        let dirItem = dirArr[index]
        if (this.$t(dirItem.dirName) === this.$t(currentName)) {
          isChecked = true
        }
      }
      return isChecked
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (index, indexPath) {
      console.log(index, indexPath)
    }
  },
  beforeMount () {
    this.menuMinHeight = `${this.$globalConst.getShowMenuHeight()}px`
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>

  .menu-bg {
    /*box-shadow:0px 0px 10px 0px rgba(184,184,184,0.5);*/
    width: 200px;
    background: #ffffff;
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    font-weight: 500!important;
  }
  .menu-bg >>> .el-submenu {
    font-weight: 500!important;
  }
</style>
