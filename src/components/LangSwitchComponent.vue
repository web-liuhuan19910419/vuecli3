/**
 * 在Head上用于切换语言选项的Lang Switch组件
 */
<template>
  <div class="lang-switch-bg" @click="langSwitch">
    <div class="lang-name">{{ lang }}</div>
    <img class="lang-icon" :src="langSrc">
  </div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String
    }
  },
  data () {
    return {
      langSrc: require(this.lang === 'ZH' ? '../assets/images/zh.jpg' : '../assets/images/en.jpg')
    }
  },
  methods: {
    langSwitch () {
      this.$emit('onLangSwitch', this.lang)
    }
  }
}
</script>

<style scoped>
.lang-switch-bg {
  width: 90px;
  height: 40px;
}

.lang-name {
  width: 32px;
  float: left;
  color: #484848;
  font-size: 16px;
  margin-top: 12px;
  margin-left: 10px;
}

.lang-icon {
  width: 32px;
  height: 32px;
  float: right;
  margin-top: 4px;
  margin-right: 10px;
}
</style>
