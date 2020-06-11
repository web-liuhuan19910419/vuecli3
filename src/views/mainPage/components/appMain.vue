<template>
  <section class="app-main" :style="{ 'height': mainMinHeight}">
    <transition name="slide-fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="key">
          <!-- 这里是会被缓存的视图组件-->
        </router-view>
      </keep-alive>
    </transition>
    <transition name="slide-fade">
      <router-view v-if="!$route.meta.keepAlive" :key="key">
        <!-- 这里是不被缓存的视图组件-->
      </router-view>
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translate3d(120deg,120deg,120deg);
  opacity: 0;
}
</style>