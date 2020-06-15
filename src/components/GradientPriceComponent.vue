<template>
  <div class="input-item-layout" >
     <input type="number" :style="freeStartCountStyle" v-model="startInput" min="1">
     <span>——></span>
     <input type="number" :style="freeEndCountStyle" v-model="endInput" min="1">
     <input type="text"  class="item-price-layout" :style="freePriceStyle" v-model="priceInput">
  </div>
</template>
<script>
export default {
  data () {
    return {
      startInput: '',
      endInput: '',
      priceInput: '',
      freeStartCountStyle: {'width': '80px'}, // 梯度价格起始数量绑定样式
      freeEndCountStyle: {'width': '80px'}, // 梯度价格结束数量绑定样式
      freePriceStyle: {'width': '200px'} // 梯度价格价格绑定样式
    }
  },
  props: {
    startInputWidthProp: {
      type: Number,
      default: 80
    }, // 设置起始数量的长度为80（默认
    endInputWidthProp: {
      type: Number,
      default: 80
    }, // 设置结束数量长度为80(默认)
    inputContentProp: {
      type: String,
      default: ''
    }, // 父传子组件的内容，通过父组件设置子组件的初始值
    endInputContentProp: {
      type: String,
      default: ''
    }, // 父传子组件的内容，通过父组件设置子组件的初始值
    priceInputContentProp: {
      type: String,
      default: ''
    }
  },
  beforeMount () {
    this.freeStartCountStyle.width = this.startInputWidthProp + 'px'
    this.freeEndCountStyle.width = this.endInputWidthProp + 'px'
  },
  watch: {
    startInput (to, from) {
      if (to !== undefined) {
        to = to.trim()
        this.$emit('on-start-input-change', to)
      }
    },
    endInput (to, from) {
      if (to !== undefined) {
        to = to.trim()
        this.$emit('on-end-input-change', to)
      }
    },
    priceInput (to, from) {
      if (to !== undefined) {
        to = to.trim()
        this.$emit('on-price-input-change', to)
      }
    },
    inputContentProp (to, from) {
      if (to !== undefined) {
        this.startInput = to
      }
    },
    endInputContentProp (to, from) {
      if (to !== undefined) {
        this.endInput = to
      }
    },
    priceInputContentProp (to, from) {
      if (to !== undefined) {
        this.priceInput = to
      }
    }
  },
  mounted () {
    if (this.inputContentProp !== undefined) {
      this.startInput = this.inputContentProp
    }
    if (this.endInputContentProp !== undefined) {
      this.endInput = this.endInputContentProp
    }
    if (this.priceInputContentProp !== undefined) {
      this.priceInput = this.priceInputContentProp
    }
  }
}
</script>
<style scoped>
  .input-item-layout {
     margin-top: 10px;
     display: flex;
     align-items: center;
   }
  .item-price-layout {
     margin-left: 40px;
   }
  .input-item-layout input {
  font-size: 14px;
  color: #484848;
  border-radius: 4px;
  border: 1.0px solid #d0d0d0;
  outline: none;
  line-height: 32px;
}
</style>
