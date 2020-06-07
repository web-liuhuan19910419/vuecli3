<template>
  <div class="main-page-layout">
     <div class="main-page-header-layout">
         <transition name="xxx">
           <p v-show="isShow">hello</p>
         </transition>
     </div>
     <div class="main-page-body-layout">
        <left-nav class="body-left"></left-nav>
        <router-view class="body-right" />
     </div>
  </div>
</template>
<script>
import LeftNav from "@/components/leftNav"
export default {
    components: { LeftNav }
}
</script>
<style lang="scss" scoped>
   $menuBackColor:#ffffff;
   $menuListH2:#8fbfef;
   $fontColor: #ffffff;
   .main-page-layout {
      width: 100%;
      height: 100%;
      background-color: white;
      .main-page-header-layout {
        width: 100%;
        height: 60px;
        box-shadow: 1px 1px 5px  $menuListH2;
        background: $menuBackColor;
        .title-layout {
          text-align: left;
          font-size: 20px;
          font-weight: 500;
          height: 60px;
          line-height: 60px;
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