<template>
  <div class="authorization-check-layout">
    <p class="title-layout">{{ $t(titleProp) }}</p>
    <div class="operation-layout" @click.stop="operationStatusSwitch()">
      <p class="operation-title-layout" :style="{'color': ((operationCheckedIndex === 3) ? '#215cb1':'#969696')}">{{ $t('message.rightsManagement.contentReadWrite') }}</p>
      <img
        class="radio-button"
        :src="operationCheckedSrc()">
    </div>
    <div class="operation-layout" @click.stop="onlyReadStatusSwitch()">
      <p class="operation-title-layout" :style="{'color': ((operationCheckedIndex === 2) ? '#215cb1':'#969696')}">{{ $t('message.rightsManagement.contentOnlyRead') }}</p>
      <img
        class="radio-button"
        :src="readCheckedSrc()">
    </div>
    <div class="operation-layout" @click.stop="hiddenStatusSwitch()">
      <p class="operation-title-layout" :style="{'color': ((operationCheckedIndex === 1) ? '#215cb1':'#969696')}">{{ $t('message.rightsManagement.contentForbid') }}</p>
      <img
        class="radio-button"
        :src="hiddenCheckedSrc()">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleProp: '',
    operationCheckedIndexProp: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      operationCheckedIndex: 3
    }
  },
  methods: {
    operationCheckedSrc () {
      if (this.operationCheckedIndex === 3) {
        return require('../assets/images/radio_checked.png')
      } else {
        return require('../assets/images/radio_unchecked.png')
      }
    },
    readCheckedSrc () {
      if (this.operationCheckedIndex === 2) {
        return require('../assets/images/radio_checked.png')
      } else {
        return require('../assets/images/radio_unchecked.png')
      }
    },
    hiddenCheckedSrc () {
      if (this.operationCheckedIndex === 1) {
        return require('../assets/images/radio_checked.png')
      } else {
        return require('../assets/images/radio_unchecked.png')
      }
    },
    operationStatusSwitch () {
      this.operationCheckedIndex = 3
      this.$emit('on-operation-checked', this.operationCheckedIndex)
    },
    onlyReadStatusSwitch () {
      this.operationCheckedIndex = 2
      this.$emit('on-operation-checked', this.operationCheckedIndex)
    },
    hiddenStatusSwitch () {
      this.operationCheckedIndex = 1
      this.$emit('on-operation-checked', this.operationCheckedIndex)
    }
  },
  beforeMount () {
    this.operationCheckedIndex = this.operationCheckedIndexProp
  }
}
</script>

<style scoped>
.authorization-check-layout {
  height: 30px;
  display: flex;
  justify-content: flex-start;
}
.title-layout {
  color: #484848;
  font-size: 12px;
  width: 120px;
  line-height: 30px;
  text-align: right;
  margin-right: 20px;
}

.operation-title-layout {
  font-size: 12px;
  line-height: 30px;
  margin-right: 10px;
}

.radio-button {
  width: 10px;
  height: 10px;
  margin-top: 10px;
  margin-right: 20px;
}

.operation-layout {
  display: flex;
  justify-content: flex-start;
}

</style>
