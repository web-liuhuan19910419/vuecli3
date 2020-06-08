<template>
  <section class="app-main" :style="{ 'height': mainMinHeight}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
       mainMinHeight: ''
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  beforeMount () {
    this.mainMinHeight = `${this.$globalConst.getMainAppHeight() - 7}px`
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  border-radius: 5px;
  border: 1px solid $menuListH2;
  margin: 10px 5px 5px 10px;
  width: calc(100% - 220px);
  float: left;
}
</style>