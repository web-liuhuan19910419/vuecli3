/**
* 整体页面的Head组件
*/
<template>
  <div class="head-bg">
    <div class="head-container" :style="{'height':`${this.$globalConst.headComponentHeight}px`}">
      <transition name="head-trans">
        <img class="head-icon" src='../assets/images/head_icon1.png' @click="gotoHomePage" v-if="headIconShow">
      </transition>
      <div class="head-right-layout">
        <div class="quick-link-layout" v-show="this.$storage.getStorage('cl_user_data') !== null">
          <header-nav :quickLinkListProp="quickTabList" @on-click-current-index="clickCurrentIndex" :defaultActiveIndexProp="defaultActiveIndex"></header-nav>
        </div>
        <div class="cut-layout">|</div>
        <div class="header-right-layout">
          <div class="login-info-layout" v-show="this.$storage.getStorage('cl_user_data') !== null">
            <el-dropdown size="mini">
              <span class="el-dropdown-link">{{passName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <p style="text-align: left; margin: 0">
                    {{$t('message.gridTitles.clientCode') + ':' + '&nbsp;&nbsp;&nbsp;' + companyCode}}
                  </p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div style="text-align: left; margin: 0">
                    <el-button type="text" size="medium" @click="onShowUserInfo">
                      {{$t('message.dirList.AccountInfoPage')}}
                    </el-button>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="onLogout">{{logoutContent}}</el-button>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="switch-lang">
            <lang-switch-component1 :cnListProp="cnList1" @onLangSwitch='onLangSwitch'></lang-switch-component1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LangSwitchComponent from './LangSwitchComponent'
  import LangSwitchComponent1 from '../components2/LangSwitchComponent2'
  import headerNav from '@/components2/headerNav'
  import configLang from '../utils/util/configLang'
  import vuexStorage from '../store/index.js'
  export default {
    components: {
      LangSwitchComponent,
      LangSwitchComponent1,
      headerNav
    },
    data () {
      return {
        cnList1: [{value: 'ZH', url: '../assets/images/zh.png'}, {value: 'EN', url: '../assets/images/en.png'}],
        activeIndex: '-1',
        headIconShow: false,
        headChineseTitleShow: false,
        headEnglishTitleShow: false,
        loginInfoContent: '',
        logoutContent: '',
        passName: '', // 用户名
        companyCode: '', // 用户代码
        quickTabList: this.$t('message.quickTab.list'), // 快速栏导航的所有数据
        defaultActiveIndex: -1
      }
    },
    methods: {
      // 头部导航切换
      clickCurrentIndex (index) {
        this.defaultActiveIndex = index
        console.log(this.defaultActiveIndex)
        console.log(this.quickTabList[index].path.quickTab)
        if (this.quickTabList[index].path.quickTab === undefined) {
          console.log('进来了我的路由跳转')
          this.$router.push({name: this.quickTabList[index].path.name})
        } else {
          this.$router.push({name: this.quickTabList[index].path.name, query: {quickTab: '1'}})
        }
      },
      // 语言切换
      onLangSwitch (lang) {
        if (lang === 'ZH') {
          configLang.configLang('cn')
          this.$i18n.locale = 'cn'
        } else if (lang === 'EN') {
          configLang.configLang('en')
          this.$i18n.locale = 'en'
        }
        this.quickTabList = this.$t('message.quickTab.list')
      },
      displayHeadContent () {
        setTimeout(() => {
          if (!this.headIconShow) {
            this.headIconShow = !this.headIconShow
          }
        }, 100)
        setTimeout(() => {
          if (!this.headChineseTitleShow) {
            this.headChineseTitleShow = !this.headChineseTitleShow
          }
        }, 500)
        setTimeout(() => {
          if (!this.headEnglishTitleShow) {
            this.headEnglishTitleShow = !this.headEnglishTitleShow
          }
        }, 1000)
      },
      // 页面不是首页&登陆页&注册页时才进入首页
      gotoHomePage () {
        if (this.$sglobal.isProduction) {
          window.location.href = 'http://www.blueoceanglobe.com'
        } else {
          if ((this.$route.name !== 'HomePage') && (this.$route.name !== 'LoginPage')) {
            this.$router.push({name: 'HomePage'})
          }
        }
      },
      // 展示客户信息相关的
      displayMyLoginInfo () {
        if ((this.$route.path.indexOf('login') === -1) && (this.$route.path.indexOf('register') === -1)) {
          let userData = this.$storage.getStorage('cl_user_data')
          if (userData !== null) {
            // 客户账户相关
            this.passName = userData.passport
            this.companyCode = userData.company_code
            this.logoutContent = this.$t('message.gridTitles.logout')
          }
        }
      },
      // 展示登录信息相关的
      displayLoginInfo () {
        // 如果是内容页而非登录注册等页面,就显示用户信息内容 & 退出登录。
        if ((this.$route.path.indexOf('login') === -1) && (this.$route.path.indexOf('register') === -1)) {
          let userData = this.$storage.getStorage('cl_user_data')
          if (userData !== null) {
            // 客户账户相关
            if ((userData.status === '3') || (userData.status === '4')) {
              this.loginInfoContent = this.$t('message.gridTitles.client') + ' ' + userData.passport + ' ' + this.$t('message.gridTitles.clientCode') + ' ' + userData.company_code
              this.logoutContent = this.$t('message.gridTitles.logout')
            } else if (userData.status === '2') {
              this.loginInfoContent = this.$t('message.gridTitles.supplier') + ' ' + userData.passport + ' ' + this.$t('message.gridTitles.clientCode') + ' ' + userData.company_code
              this.logoutContent = this.$t('message.gridTitles.logout')
            } else if ((userData.status === '1') || (userData.status === '5')) {
              this.loginInfoContent = this.$t('message.gridTitles.warehouse') + ' ' + userData.passport + ' ' + this.$t('message.gridTitles.clientCode') + ' ' + userData.company_code
              this.logoutContent = this.$t('message.gridTitles.logout')
            }
          }
        }
      },
      // 跳转到账户信息页面
      onShowUserInfo () {
        this.$router.push({name: 'AccountInfoPage'})
      },
      // 退出登录
      onLogout () {
        this.$storage.removeStorage('cl_upos')
        this.$storage.removeStorage('cl_user_data')
        this.loginInfoContent = ''
        this.logoutContent = ''
        this.$router.replace({name: 'LoginPage'})
      }
    },
    mounted () {
      this.displayHeadContent()
      this.displayMyLoginInfo()
      this.displayLoginInfo()
    },
    watch: {
      '$route' (to, from) {
        this.displayMyLoginInfo()
        this.displayLoginInfo()
        // 根据不同的路由默认刷新默认选中的index是
        if (to.name !== ('HomePage' || 'SupplierAddMemberPage' || 'PurchaseAddOrderPage' || 'PurchasePlatformSellAddNewGoodsPage' || 'OrderManagementPage' || 'StockSubmitForestPage' || 'StockEnterDetailPage' || 'StockProductNewPage' || 'StockShippmentRecordPage' || 'StockOutManagementPage')) {
          console.log('这是路由测试')
          this.defaultActiveIndex = -1
        }
        if (to.name === 'HomePage') {
          this.defaultActiveIndex = 0
        } else if (to.name === 'SupplierAddMemberPage') {
          this.defaultActiveIndex = 1
        } else if (to.name === 'PurchaseAddOrderPage') {
          this.defaultActiveIndex = 2
        } else if (to.name === 'PurchasePlatformSellAddNewGoodsPage') {
          this.defaultActiveIndex = 3
        } else if (to.name === 'OrderManagementPage') {
          this.defaultActiveIndex = 4
        } else if (to.name === 'StockSubmitForestPage') {
          this.defaultActiveIndex = 5
        } else if (to.name === 'StockEnterDetailPage') {
          this.defaultActiveIndex = 6
        } else if (to.name === 'StockProductNewPage') {
          this.defaultActiveIndex = 7
        } else if (to.name === 'StockShippmentRecordPage') {
          this.defaultActiveIndex = 8
        } else if (to.name === 'StockOutManagementPage') {
          this.defaultActiveIndex = 9
        }
      },
      '$i18n.locale' (to, from) {
        this.displayMyLoginInfo()
        this.displayLoginInfo()
      }
    }
  }
</script>

<style scoped>

  .head-bg {
    background: #3f91ed;
    border-bottom: solid 1px #f9f9f9;
  }
  .quick-link-layout {
    /*height: 60px;*/
    margin-right: 40px;
  }
  .cut-layout{
    color: #a6d0ff;
    height: 60px;
    line-height: 60px;
    margin-right: 30px;
  }
  .el-dropdown-link {
    color: white;
  }
  .head-container {
    margin:0 auto;
    display: flex;
    justify-content: space-between;
  }
  .quick-link-layout {
    float: right;
    margin-right: 40px;
  }
  .header-right-layout {
    float: right;
    margin-right: 0;
  }
  .head-right-layout {
    display: flex;
    justify-content: flex-end;
  }
  .head-right-layout {
    display: flex;
    justify-content: flex-end;
  }

  .head-icon {
    margin-top: 10px;
    margin-left: 24px;
    width: 262px;
    height: 40px;
  }

  .switch-lang {
    width: 80px;
    height: 40px;
    margin-top: 16px;
    margin-right: 30px;
    float:right;
  }

  .login-info-layout {
    width:100px;
    display: flex;
    justify-content: flex-start;
    height: 40px;
    float: left;
    margin-top: 10px;
    font-size: 14px;
    color: #484848;
    text-align: center;
    line-height: 40px;
  }
  .header-right-layout {
    margin-right: 0;
  }
</style>
