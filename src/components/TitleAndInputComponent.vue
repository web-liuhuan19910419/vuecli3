<template>
  <div class="title-input-layout">
    <p class="title-layout" v-if="isMustProp"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]"><span style="color: #E53646;">*&nbsp;</span>{{ $t(title) }}</p>
    <p class="title-layout" v-else
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <input
      class="input-layout"
      type="text"
      v-model="inputContent"
      :style="{'width':inputWidthProp}"
      v-if="!isNumberTypeProp"/>
    <input
      class="input-layout"
      type="number"
      min="0"
      v-model="inputContent"
      :style="{'width':inputWidthProp}"
      v-if="isNumberTypeProp"/>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    inputWidthProp: '',
    isFitWidthProp: false,
    isNumberTypeProp: false,
    inputContentProp: '',
    isMustProp: false
  },
  data () {
    return {
      inputContent: ''
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
