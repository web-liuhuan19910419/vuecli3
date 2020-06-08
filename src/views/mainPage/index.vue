<template>
  <div class="main-page-layout">
     <div class="main-page-header-layout">
       <div class="logo-layout">
         <transition name="logo">
           <img v-show="logoShow" src="../../assets/images/icon.png">
         </transition>
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
export default {
    components: { LeftNav, AppMain},
    data () {
      return {
        logoShow: false
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