<template>
  <div class="radio-checked-layout">
    <p class="title-layout" v-if="isMustProp"
       :style="{'width':  titleWidth}"><span style="color: #E53646;">*&nbsp;</span>{{ $t(titleProp) }}</p>
    <p class="title-layout" v-else  :style="{'width':  titleWidth}">{{ $t(titleProp) }}</p>
    <el-radio-group v-model="radio" @change="checkChanged" style="margin-left: 10px;">
      <el-radio v-for="(item) of optionsArray" :label="item.value" :key="item.value">
        {{((item.name).indexOf('message.') !== -1) ? $t(item.name) : item.name}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    props: {
      titleProp: {
        type: String,
        default: ''
      },
      isMustProp: false,
      isFitWidthProp: false,
      titleWidthProp: {
        type: String,
        default: '100px'
      },
      optionsArrayProp: {
        type: Array
      },
      radioProp: {
        type: String,
        default: '-1'
      }
    },
    data () {
      return {
        optionsArray: [],
        radio: '',
        titleWidth: ''
      }
    },
    methods: {
      checkChanged (value) { // 选中的值发生变化时候
        console.log(value, this.radio)
        this.$emit('check-change-event', value)
      }
    },
    beforeMount () {
      console.log(this.radio)
      if (this.optionsArrayProp !== undefined) {
        this.optionsArray = this.optionsArrayProp
      }
      if (this.titleWidthProp !== undefined) {
        this.titleWidth = this.titleWidthProp
      }
      this.radio = this.radioProp
    },
    watch: {
      'radioProp' (to, from) {
        if (to !== undefined) {
          this.radio = to
        }
      }
    }
  }
</script>
<style scoped>
  .radio-checked-layout {
    display: flex;
  }
  .title-layout {
    text-align: right;
  }
</style>
