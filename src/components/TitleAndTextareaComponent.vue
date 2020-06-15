<template>
  <div class="title-input-layout" :style="{height: inputHeightProp}">
     <p class="title-layout" v-if="isMustProp"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]"><span style="color:#E53646;">*&nbsp;</span>{{ $t(title) }}</p>
    <p class="title-layout" v-else
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <textarea class="input-layout"
      :placeholder="$t(inputPlaceHolderProp)"
      type="text"
      v-model="inputContent"
      :style="{'width':inputWidthProp,'height':inputHeightProp}"/>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    inputWidthProp: '',
    inputHeightProp: '',
    isFitWidthProp: false,
    inputContentProp: String,
    inputPlaceHolderProp: String,
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
        this.$emit('on-areatext-content-change', to)
      }
    },
    inputContentProp (to, from) {
      this.inputContent = to
    }
  },
  mounted () {
    this.inputContent = this.inputContentProp
  }
}
</script>

<style scoped>
.title-input-layout {
  height: 40px;
  display: flex;
  justify-content: flex-start;
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
}

.input-layout {
  font-size: 14px;
  color: #484848;
  border-radius:4px;
  border: 1.0px solid #d0d0d0;
  outline:none;
  resize:none;
  line-height: 20px;
  height: 80px;
}
</style>
