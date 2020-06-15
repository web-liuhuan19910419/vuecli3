/**
 * 在注册结束里提示用户下一步操作的组件
 */
<template>
  <div class="register-success-bg">
    <div class="register-success-container">
      <div class="register-success-title">{{ this.$t('message.gridTitles.registerSuccess') }}</div>
      <div class="register-success-content" v-html="tipContent"></div>
      <div class="register-success-count-down" v-show="type !== '注册邮箱验证'">{{ countDownContent }}</div>
      <div class="register-mail-valid-layout" v-show="type === '注册邮箱验证'">
      </div>
      <div class="confirm-button" @click="goLoginAction">
        <p>{{ buttonContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: String
    }
  },
  data () {
    return {
      sellerContent: '您已成功注册卖家账号，请耐心等待审核。<br/>通过审核后，您将会收到确认邮件，确认后即可登录。',
      supplierContent: '您已成功注册供应商账号。<br/>您将会收到确认邮件，确认后即可登录。',
      registerMailContent: '注册邮箱验证。<br/>验证通过后即可登录。',
      tipContent: '',
      count: '',
      countDownContent: '10秒后自动返回登录界面',
      buttonContent: '确定',
      timer: null
    }
  },
  beforeMount () {
    if (this.type === '卖家') {
      this.tipContent = this.sellerContent
    } else if (this.type === '供应商') {
      this.tipContent = this.supplierContent
    } else if (this.type === '注册邮箱验证') {
      this.tipContent = this.registerMailContent
    }
    // 加载倒计时函数
    if (this.type !== '注册邮箱验证') {
      this.getCountDown().then(() => {
        this.goLoginAction()
      })
    } else {
      this.mailValid()
    }
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    async getCountDown () {
      try {
        return new Promise((resolve, reject) => {
          const TIME_COUNT = 10
          if (!this.timer) {
            this.count = TIME_COUNT
            this.countDownContent = this.count + '秒后自动返回登录界面'
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
                this.countDownContent = this.count + '秒后自动返回登录界面'
              } else {
                clearInterval(this.timer)
                this.timer = null
                resolve('finish')
              }
            }, 1000)
          }
        })
      } catch (err) {
      }
    },
    goLoginAction () {
      this.$router.replace({name: 'LoginPage'})
    },
    mailValid () {
      // 验证邮箱.
      let requestData = this.$route.query.data
      let params = JSON.parse(requestData)
      if (requestData !== null) {
        this.$requestUtil
          .requestData('/api', this.$requestUtil.EXD_PROC_TEST_EMAIL, params)
          .then((responseData) => {
            // 验证是否成功 提醒用户登录.
            if (responseData.result === '1') {
              this.registerMailContent = '注册邮箱验证。<br/>验证通过后即可登录。<br/>验证成功，请点击确认去登录页面。'
            } else {
              this.registerMailContent = '注册邮箱验证。<br/>验证通过后即可登录。<br/>验证失败,再次发送邮箱验证邮件，请确认。'
              if (responseData.result === '5') {
                const parmas = {'passport': params.passport, 'test_type': '1'}
                this.$requestUtil
                  .requestData('/api', this.$requestUtil.EXD_PROC_TEST_EMAIL_RESEND, parmas)
                  .then((responseData) => {
                    // 忘记密码发送邮件成功 去邮箱查看
                    if (responseData.result === '1') {
                      this.$toast(this.$t('message.hint.sendmailRegistration'))
                    } else {
                      this.$toast(responseData.msg)
                    }
                  })
              }
            }
            this.tipContent = this.registerMailContent
          })
      }
    }
  }
}
</script>

<style scoped>

.register-success-container {
  width: 440px;
  height: 500px;
  background: white;
  margin:40px auto 0px auto;
  overflow:hidden;
}

.register-success-title {
  margin-top: 80px;
  font-size: 24px;
  color: #215cb1;
}

.register-success-content {
  margin-top: 35px;
  font-size: 14px;
  color: #3c3c3c;
  line-height: 25px;
  font-weight: bold;
  height: 50px;
}

.register-success-count-down {
  margin-top: 125px;
  font-size: 14px;
  color: #969696;
}

.register-mail-valid-layout {
  margin-top: 200px;
}

.confirm-button {
  width: 360px;
  height: 50px;
  margin: 26px auto 0px auto;
  background: #215cb1;
  border-radius:4px;
}

.confirm-button p {
  font-size: 24px;
  line-height: 50px;
  color: white;
}

</style>
