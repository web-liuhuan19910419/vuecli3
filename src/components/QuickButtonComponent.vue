/**
 * 在内容页面的行动按钮组件，点击可以回调给主页面再后续操作
 */
 <template>
   <div
    class="action-button-layout"
    @click.stop="onAction"
    :style="{'background': (isWhiteBGProp ? 'white':'#e1e1e1'), 'color' : (isWhiteBGProp ? '#215cb1':'#484848')}"
    :class="[{'action-button-fixed-width' : isFixedWidthProp}]"> {{ $t(buttonTitle) }}</div>
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
    width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
    height: 30px;
    margin: 5px 0px 5px 5px;
    border-radius:4px;
    font-size: 14px;
    text-align: center;
    color: #215cb1;
    line-height: 30px;
    padding: 0px 10px 0px 10px;
    /* border: 1.0px solid #215cb1; */
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    cursor: pointer;
  }
  .action-button-fixed-width {
    width: 130px;
  }
</style>
