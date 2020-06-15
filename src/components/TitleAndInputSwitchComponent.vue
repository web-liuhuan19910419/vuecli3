<template>
<!--控制输入框可不可编辑-->
  <div class="title-input-layout">
    <p class="title-layout"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <input
      class="input-layout"
      :disabled="disabled"
      v-model="inputContent"
      :style="{'width':inputWidthProp}"
      v-if="!isNumberTypeProp"/>
    <p style="width:80px;">{{ $t(subTitle) }}</p>
    <el-switch
     @change="changeSwitch"
      style="margin-left:10px;"
      v-model="disable"
      active-color="#215cb1"
      inactive-color="gray">
    </el-switch>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    subTitle: '',
    inputWidthProp: '',
    isFitWidthProp: false,
    isNumberTypeProp: false,
    inputContentProp: ''
  },
  data () {
    return {
      inputContent: '',
      disabled: true,
      disable: false // 控制input框可不可以编辑的
    }
  },
  watch: {
    inputContent (to, from) {
      if (to !== undefined) {
        to = to.trim()
        this.$emit('on-input-content-change', to)
      }
    },
    inputContentProp (to, from) {
      if (to !== undefined) {
        this.inputContent = to
      }
    },
    disable (to, from) {
      if (to !== undefined) {
        this.disabled = !to
        console.log(this.disabled)
      }
    }
  },
  methods: {
    changeSwitch () {
      this.inputContent = ''
      this.$emit('on-switch-change', this.disabled)
    }
  },
  mounted () {
    if (this.inputContentProp !== undefined) {
      this.inputContent = this.inputContentProp
    }
  }
}
</script>

<style scoped>
.title-input-layout {
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.title-layout {
  font-size: 14px;
  color: #484848;
  line-height: 35px;
  height: 35px;
  width: 150px;
  padding: 0 10px;
  text-align:right;
}

.title-width-fit-layout {
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  margin: 0 auto;
  width:auto;overflow:visible;
}

.input-layout {
  font-size: 14px;
  color: #484848;
  border-radius:4px;
  border: 1.0px solid #d0d0d0;
  outline:none;
  line-height: 32px;
  height: 32px;
}
</style>
