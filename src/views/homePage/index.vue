<template>
  <div class="content-layout">
      欢迎来到首页
      <p @click="goTable">进入表格页面</p>
  </div>
</template>
<script>
  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    methods: {
      goTable () {
        this.$router.push({name: 'table1'})
      }
    }
  }
</script>
<style lang="scss">

</style>