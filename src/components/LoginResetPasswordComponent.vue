/**
 * 在注册结束里提示用户下一步操作的组件
 */
<template>
  <div class="register-success-bg">
    <div class="register-success-container">
      <div class="register-success-title">重置密码</div>
      <div class="register-success-content" v-html="tipContent"></div>
      <input class="reset-password-input-layout" type="password" placeholder="请输入重置密码" v-model="password" v-if="isResetSuccess === 1"/>
      <input class="reset-password-confirm-input-layout" type="password" placeholder="请再次输入重置密码" v-model="confirmPassword" v-if="isResetSuccess === 1"/>
      <div class="reset-password-button" @click="resetPasswordAction" v-if="isResetSuccess === 1">
        <p>重置</p>
      </div>
      <div class="login-button" @click="goLoginAction" v-if="isResetSuccess === 2">
        <p>确认</p>
      </div>
      <div class="login-button" @click="goSendMail" v-if="isResetSuccess === 3">
        <p>确认</p>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      loginMailContent: '重置密码邮箱验证。<br/>验证通过后输入新密码即可完成重置。',
      tipContent: '',
      password: '',
      confirmPassword: '',
      // 1 还没有验证 2 已经验证通过 3 邮箱验证过期
      isResetSuccess: 1
    }
  },
  beforeMount () {
    this.tipContent = this.loginMailContent
  },
  methods: {
    resetPasswordAction () {
      if (this.password.length < 6) {
        this.$toast(this.$t('message.hint.atLeastSixbitcharPassword'))
        return
      }
      if (this.confirmPassword.length < 6) {
        this.$toast(this.$t('message.hint.atLeastSixbitcharConfirmPassword'))
        return
      }
      if (this.password !== this.confirmPassword) {
        this.$toast(this.$t('message.hint.inputPasswordConsistent'))
        return
      }
      // 验证邮箱 & 修改密码
      let requestData = this.$route.query.data
      let params = JSON.parse(requestData)
      const passwordMD5 = md5(this.password)
      params.password = passwordMD5

      if (requestData !== null) {
        this.$requestUtil
          .requestData('/api', this.$requestUtil.EXD_PROC_TEST_EMAIL, params)
          .then((responseData) => {
            // 验证是否成功 提醒用户登录.
            if (responseData.result === '1') {
              this.loginMailContent = '重置密码成功。<br/>请返回登录页面。'
              this.isResetSuccess = 2
            } else {
              this.loginMailContent = '重置密码失败。<br/>请确认重置邮件是否过期。'
              if (responseData.result === '5') {
                this.isResetSuccess = 3
                this.goSendMail(params.passport)
              }
            }
            this.tipContent = this.loginMailContent
          })
      }
    },
    goLoginAction () {
      this.$router.replace({name: 'LoginPage'})
    },
    goSendMail (passport) {
      // test_type === 2 忘记密码参数
      const parmas = {'passport': passport, 'test_type': '2'}
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

.reset-password-button {
  width: 360px;
  height: 50px;
  margin: 50px auto 0px auto;
  background: #215cb1;
  border-radius:4px;
}

.login-button {
  width: 360px;
  height: 50px;
  margin: 150px auto 0px auto;
  background: #215cb1;
  border-radius:4px;
}

p {
  font-size: 24px;
  line-height: 50px;
  color: white;
}

.reset-password-input-layout {
  width: 240px;
  height: 32px;
  margin-top: 80px;
  margin-left: 20px;
  font-size: 14px;
  border-radius:4px;
  border: 1.0px solid #d0d0d0;
  padding-left: 10px;
  text-align: center;
  outline:none;
}

.reset-password-confirm-input-layout {
  width: 240px;
  height: 32px;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 14px;
  border-radius:4px;
  border: 1.0px solid #d0d0d0;
  padding-left: 10px;
  text-align: center;
  outline:none;
}

</style>
