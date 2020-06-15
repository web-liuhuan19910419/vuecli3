/**
 * 协议组件
 */
<template>
  <div class="agreement-layout">
    <input type="checkbox" class="agreement-checkbox"  v-model='checked' :id="agreementObj.id"/>
    <label :for="agreementObj.id" class="agreement-checkbox-content">{{ this.$t('message.hint.reviewAndAgree') }}</label>
    <p class="agreement-title" @click="See()">{{ agreementObj.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    agreementObj: Object
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    See () {
      if (this.agreementObj.componentName.length > 0) {
        const routeData = this.$router.resolve({name: this.agreementObj.componentName})
        window.open(routeData.href, '_blank')
      }
    }
  },
  watch: {
    checked (to, from) {
      this.$emit('on-check', to)
    }
  }
}
</script>

<style scoped>

.agreement-layout {
  width: 100%;
  height: 20px;
  margin: 0px auto 0px auto;
  display: flex;
  justify-content: flex-start;
}

.agreement-checkbox {
  width:20px;
  height:20px;
  margin-left: 60px;
}

.agreement-checkbox-content {
  font-size: 12px;
  margin-top: 4px;
  margin-left: 10px;
  color: #969696;
}

.agreement-title {
  font-size: 12px;
  margin-top: 4px;
  cursor: pointer;
  color: #969696;
}

.agreement-title:hover
{
  color:#215cb1;
}

</style>
