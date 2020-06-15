<template>
  <div class="title-input-layout" :style="{'height': inputHeightProp}">
    <p class="title-layout"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <input
      :placeholder="inputPlaceHolder"
      class="input-layout"
      type="text"
      v-model="inputContent"
      maxlength="240"
      :style="{'width':inputWidthProp}"
      v-if="isTextTypeProp"/>
     <textarea class="input-layout2"
      :placeholder="inputPlaceHolder"
      type="text"
      maxlength="240"
      v-if="isTextAreaTypeProp"
      v-model="inputContent"
      :style="{'width':inputWidthProp,'height':inputHeightProp}"/>
    <input
      class="input-layout"
      type="number"
      min="1"
      maxlength="240"
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
    inputHeightProp: '',
    isFitWidthProp: false,
    isTextTypeProp: false,
    isTextAreaTypeProp: false,
    isNumberTypeProp: false,
    inputContentProp: ''
  },
  data () {
    return {
      inputContent: '',
      inputPlaceHolder: this.$t('message.hint.remarkMaxlength')
    }
  },
  watch: {
    inputContent (to, from) {
      if (to !== undefined) {
        if (to.length >= 240) {
          this.$toast(this.$t('message.hint.remarkMaxlength'))
        }
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
.input-layout2 {
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
