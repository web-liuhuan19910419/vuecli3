<template>
  <ul class="content-bg-layout">
    <li v-for="(item,index) of quickLinkListData" :key="index" @click="clickCurrntIndex(index)" :class="[defaultActiveIndex === index ? 'item-active-styles' : 'item-default-styles']">{{item.name}}</li>
  </ul>
</template>
<script>
  export default {
    props: {
      quickLinkListProp: Array,
      defaultActiveIndexProp: {
        type: Number,
        default: -1
      } // 默认选中的index
    },
    data () {
      return {
        quickLinkListData: [],
        defaultActiveIndex: -1
    }
   },
    methods: {
      clickCurrntIndex (index) { // 点击当前的index
        this.defaultActiveIndex = index
        console.log(this.defaultActiveIndex)
        this.$emit('on-click-current-index', index) // 提交给父组件
      }
    },
    created () {
      this.quickLinkListData = this.quickLinkListProp
      this.defaultActiveIndex = this.defaultActiveIndexProp
    },
    watch: {
      'quickLinkListProp' (to) {
        if (to !== undefined) {
          this.quickLinkListData = to
        }
      },
      'defaultActiveIndexProp' (to) {
        if (to !== undefined) {
          this.defaultActiveIndex = to
        }
      }
    }
  }
</script>
<style scoped>
  .content-bg-layout {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    display: flex;
  }
  .item-default-styles{
    cursor: pointer;
    transition: all 0.6s ease;
    color: #a6d0ff;
  }
  .item-active-styles{
    font-weight: 600;
    color: #3191ed;
  }
  .content-bg-layout > li + li {
    margin-left: 20px;
  }
  .content-bg-layout > li:hover{
     font-weight: 600;
     color: #3191ed;
  }
</style>
