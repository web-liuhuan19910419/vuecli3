<template>
    <div class="left-nav-layout" :style="{ 'height': menuMinHeight}">
        <aside>
        <ul class="asideMenu">
          <li v-for="(item,index) in menuList" :key="item.name">
            <div class="oneMenu" @click="showToggle(item,index)">
              <!--<img v-bind:src="item.imgUrl" />-->
              <span>{{item.name}}</span>
            </div>
            <ul v-show="item.isSubShow === true">
              <li v-for="(subItem, i) in item.subItems" :key="subItem.name" @click="clickSubMenu(subItem,i)">
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
      menuMinHeight: '0px',
      show: false,
      menuList: [
        {name: '表格组件',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '封装表格1', pathName: 'table1'},
         {name: '封装表格2', pathName: 'table2'},
         {name: 'element表格'}
        ]
        },
       {name: '搜索组件',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '搜索组件1'},
         {name: '搜索组件2'}
        ]
       },
       {name: '表单组件',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '自动配置表单'}
        ]
       },
       {name: '国际化',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '中英双翻译'}
        ]
       },
       {name: '数据可视化',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '表格'}
        ]
       },
       {name: '地图',
        imgUrl: require('../../../../assets/images/menu1.png'),
        isSubShow: false,
        subItems: [
         {name: '尝试地图'}
        ]
       }
      ],
      activeIndex: -1, // 选中的activeIndex
      defaultActivePath: '-1' // 默认设置的
    }
  },
  methods: {
     showToggle (item,ind){
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        for (let index = 0; index < this.menuList.length; index++) {
          if (index !== ind) {
            this.menuList[index].isSubShow = false
          }
        }
        item.isSubShow = !item.isSubShow
        console.log(this.menuList)
        console.log(item.isSubShow)
    },
    clickSubMenu(subItem,i) {
      console.log(subItem,i)
      this.$router.push({name: subItem.pathName})
    }
  },
  beforeMount () {
    this.menuMinHeight = `${this.$globalConst.getShowMenuHeight()}px`
  }
}
</script>
<style lang="scss" scoped>
  // $menuBackColor:#3191ed;
  // $menuListH2:#8fbfef;
  // $subMenuColor: #ffffff;
  // $subMenuDefaultFontColor: #8fbfef;
  // $fontColor: #ffffff;
   .left-nav-layout {
     width: 200px;
     float: left;
    aside{
      background: $menuBackColor;
      height: 100%;
      .asideMenu{
        .oneMenu{
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          font-weight: normal;
          color: $fontColor;
          font-size: 14px;
          padding-left: 20%;
          cursor: pointer;
          img{
            width: 20px;
            height: 20px;
            margin: 15px 16px 15px 20px;
            vertical-align: top;
          }
          &:hover {
            background-color: rgba(169, 169, 169, 0.6);
          }
        }
        .oneMenuChild{
          cursor: pointer;
          font-size: 12px;
          padding: 0 20px 0 60px;
          height: 40px;
          line-height: 40px;
          background: $subMenuColor;
          color: $subMenuDefaultFontColor;
        }
      }
    }
  }
</style>