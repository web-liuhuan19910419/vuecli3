<template>
  <div class="go-back-layout" @click="goBackAction">
    <p>{{ $t('message.goBack') }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    goBackAction () {
      let dirArrLen = this.$store.state.dirArrModule.dirArr.length
      if (dirArrLen >= 2) {
        // 分析报告 Patch
        if (this.$store.state.dirArrModule.dirArr[1].name.indexOf('StockEnterDetailPage') !== -1) {
          this.$router.go(-1)
        } else if (this.$store.state.dirArrModule.dirArr[1].name.indexOf('StockAddedValuePage') !== -1) {
          this.$router.go(-1)
        } else if (this.$store.state.dirArrModule.dirArr[1].name.indexOf('WaybillManagementAlreadyPage') !== -1) {
          this.$router.go(-1)
        } else if (this.$store.state.dirArrModule.dirArr[1].name.indexOf('StockProductDistributionPage') !== -1) {
          this.$router.go(-1)
        } else {
          let dirItem = this.$store.state.dirArrModule.dirArr[dirArrLen - 2]
          this.$router.push({name: dirItem.name})
        }
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
  .go-back-layout {
    width: 80px;
    height: 30px;
    font-size: 14px;
    color: #484848;
    line-height: 30px;
    cursor: pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
</style>
