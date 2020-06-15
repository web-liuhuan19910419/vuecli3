<template>
  <div class="title-input-layout">
    <p class="title-layout" :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <p class="receive-content-layout" v-if="isNotLangContent">{{ $t(receiveContentProp) }}</p>
    <p class="receive-content-layout" v-if="!isNotLangContent">{{ receiveContentProp }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    receiveContentProp: '',
    isFitWidthProp: false,
    isNotLangContent: false,
    contentLengthProp: {
      type: String,
      default: '180px'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.title-input-layout {
  height: 35px;
  display: flex;
  justify-content: flex-start;
  /* -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none; */
}
.title-layout {
  font-size: 14px;
  color: #484848;
  line-height: 35px;
  height: 35px;
  width: 120px;
  padding: 0 10px;
  text-align:right;
}

.title-width-fit-layout {
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
}

.receive-content-layout {
  font-size: 14px;
  color: #969696;
  line-height: 35px;
  height: 35px;
  width: 600px;
  text-align:left;
}
</style>
