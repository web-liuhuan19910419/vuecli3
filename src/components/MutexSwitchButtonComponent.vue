/**
 * 在内容页面的互斥按钮组件，在多个按钮中，只选中一个.
 */
 <template>
  <div class="mutex-switch-button-layout">
    <p class="mutex-switch-title-layout" v-if="isMustProp"><span style="color:#E53646;">*&nbsp;</span>{{ $t(mutexTitle)}}</p>
    <p class="mutex-switch-title-layout" v-else>{{ $t(mutexTitle)}}</p>
    <ul class="ul-layout item-margin-left-layout">
        <el-radio-group v-model="selectValue">
            <el-radio-button v-for="(option, index) in options" :key="option.name+index" :label="option.value">{{ $t(option.name)}}</el-radio-button>
        </el-radio-group>
    </ul>
  </div>
 </template>

<script>
import ActionButtonComponent from './ActionButtonComponent'
export default {
  components: {
    ActionButtonComponent
  },
  props: {
    isMustProp: false,
    mutexTitle: String,
    options: Array,
    currentSelectIndexProp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectValue: '0'
    }
  },
  methods: {
  },
  created () {
    for (let index in this.options) {
      let item = this.options[index]
      item.value = index.toString()
    }
    if (this.currentSelectIndexProp !== undefined) {
      this.selectedValue = this.currentSelectIndexProp.toString()
    }
  },
  watch: {
    currentSelectIndexProp (to, from) {
      if (to !== undefined) {
        this.currentIndex = to
        console.log(this.currentIndex)
      }
    },
    options (to, from) {
      for (let index in this.options) {
        let item = this.options[index]
        item.value = index.toString()
      }
    },
    selectValue (to, from) {
      this.currentIndex =
      this.$emit('on-mutex-button-action', Number.parseInt(this.selectValue))
    }
  }
}
</script>

<style scoped>

    .mutex-switch-button-layout {
        display: flex;
        justify-content: flex-start;
        width:fit-content;
        width:-webkit-fit-content;
        width:-moz-fit-content;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        margin-right: 20px;
        align-items: center;
    }

  .mutex-switch-title-layout {
    font-size: 12px;
    color: #484848;
    margin-left: 10px;
  }

  .ul-layout {
    display: flex;
    justify-content: flex-start;
  }

</style>
