<template>
  <div class="title-input-layout">
    <p class="title-layout" :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <p class="receive-content-layout" v-on:mouseenter="visible" @mouseleave="invisible" v-if="isNotLangContent">{{ $t(receiveContentProp) }}
      <span v-show="seen"> {{ $t(receiveContentProp) }} </span>
    </p>
    <p class="receive-content-layout" v-on:mouseenter="visible" @mouseleave="invisible" v-if="!isNotLangContent">{{ receiveContentProp }}
      <span v-show="seen">{{ receiveContentProp }} </span>
    </p>
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
      seen: false
    }
  },
  methods: {
    visible () {
      if (this.receiveContentProp.length > 0) {
        this.seen = true
      }
    },
    invisible () {
      this.seen = false
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
  color: #969696;
  line-height: 35px;
  height: 35px;
  width: 600px;
  text-overflow: ellipsis;
  word-break:break-all;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  overflow: hidden;
  text-align:left;
  cursor: pointer;
}
span{
  padding:5px;
  position:absolute;
  left:0px;
  top: 0px;
  border-radius:4px;
  background-color: #fffcdf;
  font-size: 12px;
  line-height: 20px;
  height: 50px;
  color:#215cb1;
  z-index: 9999;
}

</style>
