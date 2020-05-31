<template>
    <div class="left-nav-layout" :style="{ 'height': menuMinHeight}">
        <aside>
        <ul class="asideMenu">
          <li v-for="(item,index) in $menuList" :key="item.name">
            <div class="oneMenu" @click="showToggle(item,index)">
              <img v-bind:src="item.imgUrl" />
              <span>{{item.name}}</span>
            </div>
            <ul v-show="item.isSubShow">
              <li v-for="subItem in item.subItems" :key="subItem.name">
                <div class="oneMenuChild">{{subItem.name}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
</template>
<script>
export default {
  data () {
    return {
      menuMinHeight: '0px'
    }
  },
  methods: {},
  beforeMount () {
    this.menuMinHeight = `${this.$globalConst.getShowMenuHeight()}px`
  }
}
</script>
<style lang="scss" scoped>
  $menuBackColor:#f1f1f1;
  $menuListH2:#8fbfef;
   .left-nav-layout {
     width: 200px;
    aside{
      background: $menuBackColor;
      height: 100%;
      .asideMenu{
        .oneMenu{
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          font-weight: normal;
          color: #ffffff;
          background: $menuListH2 url("../../assets/images/menu2.png") no-repeat 200px center;
          border-bottom: 1px solid #669cd9;
          img{
            width: 20px;
            height: 20px;
            margin: 15px 16px 15px 20px;
            vertical-align: top;
          }
        }
        .oneMenuChild{
          padding: 0 20px 0 60px;
          height: 40px;
          line-height: 40px;
          background: $menuBackColor;
          border-bottom: 1px solid #ffffff;
          color: #454343;
          font-size: 18px;
        }
      }
    }
  }
</style>