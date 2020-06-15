/**
 * Tab 切换组件.
 */
<template>
  <div class="tab-bg">
    <el-tabs v-model="currentIndex" @tab-click="handleClick" style="margin-left: 20px">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :label="$t(item.name)"
        :name="index.toString()"
        :key="$t(item.name)"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    currentIndexProp: Number
  },
  data () {
    return {
      currentIndex: '0'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log('tab =' + tab, event)
      this.currentIndex = tab.name
      this.$emit('on-tab-change', Number.parseInt(this.currentIndex))
    }
    // onSwitchTab (index) {
    //   this.currentIndex = index
    //   this.$emit('on-tab-change', this.currentIndex)
    // }
  },
  beforeMount () {
    if (this.currentIndexProp !== undefined) {
      this.currentIndex = this.currentIndexProp.toString()
    }
  },
  watch: {
    currentIndexProp (to, from) {
      if (to !== undefined) {
        this.currentIndex = to.toString()
      }
    }
  }
}
</script>

<style scoped>
.tab-bg {
  width: 100%;
  height: 40px;
  background: white;
}

</style>
