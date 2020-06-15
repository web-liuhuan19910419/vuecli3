<template>
  <div class="check-all-layout" @click.stop="switchCheckAll">
    <img class="check-all-radio" :src="checkAllStatus()">
    <p class="check-all-content">{{ $t('message.checkAll') }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    checkAllStatus () {
      let isAllChecked = true
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.disposableUPCListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.disposableUPCListData[index]
        if (element.checked === false) {
          isAllChecked = false
        }
      }
      if (isAllChecked === true) {
        return require('../../assets/images/radio_checked.png')
      } else {
        return require('../../assets/images/radio_unchecked.png')
      }
    },
    switchCheckAll () {
      let isAllChecked = true
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.disposableUPCListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.disposableUPCListData[index]
        if (element.checked === false) {
          isAllChecked = false
        }
      }

      isAllChecked = !isAllChecked

      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.disposableUPCListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.disposableUPCListData[index]
        element.checked = isAllChecked
      }
      this.$emit('on-grid-switch-status-from-check-all', isAllChecked)
    }
  }
}
</script>

<style scoped>
  .check-all-layout {
    display: flex;
    justify-content: flex-start;
    height: 45px;
  }

  .check-all-radio {
    width: 10px;
    height: 10px;
    margin-top: 17px;
    margin-left: 20px;
  }

  .check-all-content {
    font-size: 14px;
    color: #484848;
    margin-left: 10px;
    line-height: 45px;
  }
</style>
