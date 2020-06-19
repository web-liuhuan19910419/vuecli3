<template>
  <div class="main-page-layout">
     <div class="main-page-header-layout">
       <div class="logo-layout">
         <transition name="logo">
           <img v-show="logoShow" src="../../assets/images/icon.png">
         </transition>
       </div>
       <div class="head-right-layout">
          <div class="quick-link-layout">
            <header-nav :quickLinkListProp="quickTabList" @on-click-current-index="clickCurrentIndex" :defaultActiveIndexProp="defaultActiveIndex"></header-nav>
          </div>
          <div class="user-info-layout">
            <el-dropdown size="mini">
              <span class="el-dropdown-link">{{userName}}2222222<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <p style="text-align: left; margin: 0">
                    {{'用户' + ':' + '&nbsp;&nbsp;&nbsp;' + userName}}
                  </p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div style="text-align: left; margin: 0">
                    <el-button type="text" size="medium" @click="loginOut">
                      退出
                    </el-button>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          </div>
       </div>
     </div>
     <div class="main-page-body-layout">
        <left-nav class="body-left"></left-nav>
        <app-main/>
     </div>
  </div>
</template>
<script>
import LeftNav from "./components/leftNav"
import AppMain from "./components/appMain"
import headerNav from '@/components/headerNav'
export default {
    components: { LeftNav, AppMain, headerNav},
    data () {
      return {
        logoShow: false,
        quickTabList: [{name: '首页', pathName: 'home'}, {name: '页面1'}, {name: '页面2'}, {name:'页面3'}, {name: '页面4'}, {name: '页面5'}, {name: '页面6'}, {name: '页面7'}], // 快速栏导航的所有数据
        defaultActiveIndex: -1,
        userName: 'users'
      }
    },
    methods:{
      loginOut () {
        sessionStorage.setItem('UserToken', false)
        this.$router.push({name: 'login'})
      },
      clickCurrentIndex (index) { // 点击横向导航
        console.log(index)
        this.$router.push({name: this.quickTabList[index].pathName})
      }
    },
    created () {
      this.logoShow = true
    }
}
</script>
<style lang="scss" scoped>
  //  $menuBackColor:#ffffff;
  //  $menuListH2:#8fbfef;
  //  $fontColor: #ffffff;
   .logo-enter-active, .logo-leave-active {
     transition: opacity 1s;
   }
   .logo-enter,.logo-to {
     opacity: 0;
   }
   .main-page-layout {
      width: 100%;
      height: 100%;
      background-color: white;
      .main-page-header-layout {
        width: 100%;
        height: 60px;
        box-shadow: 1px 1px 5px  $menuListH2;
        background:white;
        .logo-layout {
          float: left;
          padding-top: 10px;
          padding-left: 10px;   
        }
        .head-right-layout {
          float: right;
          .quick-link-layout {
            float: left;
          }
          .user-info-layout {
            margin-top: 20px;
            width: 200px;
            height: 40px;
            float: right;
          }
        }
      }
      .main-page-body-layout {
          width: 100%;
          .body-left {
            float: left;
            height: 100%;
            text-align: left;
            background: #ffffff;
            overflow: auto;
          }
          .body-right {
           overflow: auto;
          }
       }
   }
</style>