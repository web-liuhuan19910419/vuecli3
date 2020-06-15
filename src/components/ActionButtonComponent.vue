/**
 * 在内容页面的行动按钮组件，点击可以回调给主页面再后续操作
 */
 <template>
     <el-button v-if="!isWhiteBGProp" class="action-button-layout" type="primary" @click.stop="onAction" :class="[{'action-button-fixed-width' : isFixedWidthProp}]">{{ $t(buttonTitle) }}</el-button>
     <el-button v-else class="action-button-layout" @click.stop="onAction" :class="[{'action-button-fixed-width' : isFixedWidthProp}]">{{ $t(buttonTitle) }}</el-button>
 </template>

<script>
export default {
  props: {
    buttonTitle: '',
    isWhiteBGProp: true,
    isFixedWidthProp: false
  },
  data () {
    return {
      isWhiteBG: true
    }
  },
  methods: {
    onAction () {
      this.$emit('on-button-action', this.buttonTitle)
    }
  }
}
</script>

<style scoped>
    .action-button-layout {
        min-width: 70px;
    }
    .action-button-fixed-width {
        width: 130px;
    }
</style>
