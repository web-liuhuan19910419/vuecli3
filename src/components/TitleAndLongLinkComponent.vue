<template>
  <div class="title-input-layout">
    <p class="title-layout" :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <p class="receive-content-layout" v-if="isNotLangContent" @click.stop="clickLink">{{ $t(receiveContentProp) }}</p>
    <p class="receive-content-layout" v-if="!isNotLangContent" @click.stop="clickLink">{{ receiveContentProp }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    receiveContentProp: '',
    receiveLinkProp: '',
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
  },
  methods: {
    clickLink () {
      if (this.receiveLinkProp.length === 0) {
        return
      }
      window.open(this.receiveLinkProp, '_blank')
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
  width: 150px;
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
  color: #215cb1;
  line-height: 35px;
  height: 35px;
  width: 600px;
  text-overflow: ellipsis;
  word-break:break-all;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  overflow: hidden;
  /* width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content; */
  text-align:left;
  cursor: pointer;
}
</style>
