/**
 * 快捷键组件
 */
<template>
  <div class="quick-tab-bg">
    <div class="quick-tab-container" :style="{'height':`${this.$globalConst.quickTabComponentHeight}px`}">
      <p class="quick-tab-title-layout">{{ quickTitle }}</p>
      <ul class="quick-tab-button-layout">
        <li class="li-layout" v-for="(item, index) in this.quickTabList" :key=item.name>
          <quick-button-component
            :buttonTitle='item.name'
            @on-button-action="onQuickItemReact(index)"
            :isWhiteBGProp=processReactIndex(index)>
          </quick-button-component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import QuickButtonComponent from './QuickButtonComponent'
export default {
  components: {
    QuickButtonComponent
  },
  props: {
    quickTitleProp: String,
    quickTabListProp: String
  },
  data () {
    return {
      quickTitle: '',
      quickTabList: this.$t('message.stateList.list'),
      reactIndex: -1
    }
  },
  methods: {
    onQuickItemReact (index) {
      this.reactIndex = index
      if (this.quickTabList[index].path.quickTab === undefined) {
        this.$router.push({name: this.quickTabList[index].path.name})
      } else {
        this.$router.push({name: this.quickTabList[index].path.name, query: {quickTab: '1'}})
      }
    },
    processReactIndex (index) {
      if (this.reactIndex === -1) {
        return false
      } else {
        if (index === this.reactIndex) {
          return true
        } else {
          return false
        }
      }
    }
  },
  beforeMount () {
    this.quickTitle = this.$t(this.quickTitleProp)
    this.quickTabList = this.$t(this.quickTabListProp)
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
    },
    '$i18n.locale' (to, from) {
      this.quickTitle = this.$t(this.quickTitleProp)
      this.quickTabList = this.$t(this.quickTabListProp)
    }
  }
}
</script>

<style scoped>

.quick-tab-bg {
  background: #979797;
}

.quick-tab-title-layout {
  font-size: 14px;
  color:  white;
  float: left;
  line-height: 45px;
  width: 200px;
  text-align: center;
  background: #737373;
}

.quick-tab-container {
  margin:0 auto;
}

.quick-tab-button-layout {
  display: flex;
  justify-content: flex-start;
}

.li-layout {
  margin-top: 4px;
}

</style>
