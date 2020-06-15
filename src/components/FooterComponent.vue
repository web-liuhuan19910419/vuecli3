/**
 * 整体页面的Foot组件
 */
<template>
  <div class="foot-bg">
    <div class="foot-container" :style="{'height':`${this.$globalConst.footComponentHeight}px`}">
      <p :style="{'line-height':`${this.$globalConst.footComponentHeight}px`}">{{footContent}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footContent: ''
    }
  },
  methods: {
    processFootContent () {
      let needShowSupport = false
      let userData = this.$storage.getStorage('cl_user_data')
      if (userData === null) {
        needShowSupport = false
      } else if (this.$route.name === 'LoginPage') {
        needShowSupport = false
      } else {
        let uid = userData.uid
        if (parseInt(uid) > 20) {
          needShowSupport = true
        } else {
          needShowSupport = false
        }
      }
      needShowSupport = false // 关闭技术支持
      if (needShowSupport) {
        if (this.$i18n.locale === 'cn') {
          return 'Copyright © 2018-2019 蓝海物流-电商配套服务中心 中国浙江杭州澜创科技有限公司技术支持'
        } else if (this.$i18n.locale === 'en') {
          return 'Copyright © 2018-2019 LanHai Logistics - E-commerce Support Service Center. Support By Lanchuang Tech. Limited Company Hangzhou Zhejiang China'
        }
      } else {
        if (this.$i18n.locale === 'cn') {
          return 'Copyright © 2018-2019 蓝海物流-电商配套服务中心'
        } else if (this.$i18n.locale === 'en') {
          return 'Copyright © 2018-2019 LanHai Logistics - E-commerce Support Service Center.'
        }
      }
    }
  },
  beforeMount () {
    this.footContent = this.processFootContent()
  },
  watch: {
    '$route' (to, from) {
      this.footContent = this.processFootContent()
    },
    '$i18n.locale' (to, from) {
      this.footContent = this.processFootContent()
    }
  }
}
</script>

<style scoped>
.foot-bg {
  background: #737a85;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.foot-container {
  width: 1200px;
  height: 100%;
  margin:0 auto;
}

.foot-container p {
  font-size: 12px;
  color: #c4cbd6;
}

</style>
