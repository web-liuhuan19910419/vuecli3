/**
 * 在内容页面的行动按钮组件，点击可以回调给主页面再后续操作
 */
 <template>
<!--   <div-->
<!--    class="action-button-layout"-->
<!--    @click.stop="onAction"-->
<!--    :style="{'background': (isWhiteBGProp ? 'white':'#215cb1'), 'color' : (isWhiteBGProp ? '#215cb1':'white')}"-->
<!--    :class="[{'action-button-fixed-width' : isFixedWidthProp}]"> {{ $t(buttonTitle) }}</div>-->
   <el-button v-if="isWhiteBGProp" class="action-button-layout" :class="[{'action-button-fixed-width' : isFixedWidthProp}]" @click="onAction">{{ $t(buttonTitle) }}</el-button>
   <el-button v-else type="primary" class="action-button-layout" :class="[{'action-button-fixed-width' : isFixedWidthProp}]" @click="onAction">{{ $t(buttonTitle) }}</el-button>
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
    font-size: 12px;
  }
  .action-button-fixed-width {
    width: 130px;
  }
</style>
