<template>
  <div class="check-all-layout" @click.stop="switchCheckAll">
    <img class="check-all-radio" :src="optionAllStatus()">
    <p class="check-all-content">全选</p>
  </div>
</template>

<script>
export default {
  props: {
    // GridComponent用来影响CheckAllComponent的全选或不全选状态的变量
    itemListProp: Array
  },
  data () {
    return {
      isOptionAllLocal: false,
      itemList: []
    }
  },
  methods: {
    optionAllStatus () {
      if (this.isOptionAllLocal === true) {
        return require('../assets/images/radio_checked2.png')
      } else {
        return require('../assets/images/radio_unchecked2.png')
      }
    },
    configOptionAllStatus () {
      let flag = true
      let isOptionAll = true
      for (let item of this.itemList) { // 检测是不是全部都不能选 全部是2的话 flag = true
        if (item.checked !== '2') {
          flag = !flag
          break
        }
      }
      console.log(flag)
      if (this.itemList.length === 0) {
        isOptionAll = false
      } else {
        for (let index = 0; index < this.itemList.length; index++) {
          if ((this.itemList[index].checked === undefined) || ((this.itemList[index].checked === '0') || flag === true)) {
            isOptionAll = false
            break
          }
        }
        this.isOptionAllLocal = isOptionAll
      }
    },
    switchCheckAll () {
      this.isOptionAllLocal = !this.isOptionAllLocal
      for (let index = 0; index < this.itemList.length; index++) {
        if (this.itemList[index].checked === '2') { // 禁止选择
          this.itemList[index].checked = '2'
        } else {
          this.itemList[index].checked = this.isOptionAllLocal === true ? '1' : '0'
        }
      }
      this.$emit('on-grid-switch-option-all', this.itemList)
    }
  },
  watch: {
    // 观察itemListProp变化，调整isOptionAllLocal状态
    itemListProp: {
      handler (to, from) {
        console.log('进来了itemListProp')
        this.itemList = this.itemListProp
        console.log(this.itemList)
        this.configOptionAllStatus()
      },
      deep: true
    }
  },
  beforeMount () {
    this.itemList = this.itemListProp
  }
}
</script>

<style scoped>
  .check-all-layout {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px!important;
    /*height: 45px;*/
  }

  .check-all-radio {
    width: 10px;
    height: 10px;
    margin-left: 10px;
  }

  .check-all-content {
    font-size: 14px;
    color: #484848;
    margin-left: 10px;
    width: 30px;
  }
  .check-all-radio {
    width: 30px;
    height: 30px;
  }
</style>
