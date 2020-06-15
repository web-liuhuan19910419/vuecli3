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
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.mySupplierListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.mySupplierListData[index]
        if (element.checked === false) {
          isAllChecked = false
        }
      }
      if (isAllChecked === true) {
        return require('../../assets/images/radio_checked2.png')
      } else {
        return require('../../assets/images/radio_unchecked2.png')
      }
    },
    switchCheckAll () {
      let isAllChecked = true
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.mySupplierListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.mySupplierListData[index]
        if (element.checked === false) {
          isAllChecked = false
        }
      }

      isAllChecked = !isAllChecked

      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.mySupplierListData.length; index++) {
        let element = this.$store.state.supplierAndPurchaseModule.mySupplierListData[index]
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
    align-items: center;
    justify-content: flex-start;
  }

  .check-all-radio {
    width: 30px;
    height: 30px;
    /*margin-top: 17px;*/
    margin-left: 20px;
  }

  .check-all-content {
    font-size: 14px;
    color: #484848;
    margin-left: 5px;
    margin-right: 10px;
  }
</style>
