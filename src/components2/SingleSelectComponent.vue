/**
 * 下拉单选组件
 */
<template>
    <el-select v-model="selectedValue"  :placeholder="$t(selectPlaceholder)"  @change="selectMethod" size="mini" class="single-select-layout">
        <el-option
                v-for="item in showOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'SingleSelectComponent',
  props: {
    selectedProp: '',
    selectPlaceholder: {
      type: String
    },
    options: {
      default: Array
    },
    isLocalData: true,
    isMustProp: false // 默认不是必须填写的
  },
  data () {
    return {
      selectedValue: '',
      selectLabel: '',
      showOption: []
    }
  },
  methods: {
    selectMethod (value) {
      this.$emit('on-select-change', Number.parseInt(value))
    },
    langSwitch () {
      if (this.isLocalData === false) {
        return
      }
      if (this.options !== undefined) {
        this.showOption = []
        for (let index = 0; index < this.options.length; index++) {
          let element = this.options[index]
          let tmpItem = {}
          if (element.name.indexOf('message.') === -1) {
            tmpItem['name'] = element.name
          } else {
            tmpItem['name'] = this.$t(element.name)
          }
          tmpItem['value'] = index.toString()
          this.showOption.push(tmpItem)
        }
      }
    },
    configShowOptionsFromNet () {
      this.showOption = []
      this.langSwitch()
    }
  },
  beforeMount () {
    if (this.selectedProp !== undefined) {
      this.selectedValue = this.selectedProp.toString()
    }
    this.langSwitch()
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.selectedProp !== undefined) {
        this.selectedValue = this.selectedProp.toString()
      }
    },
    options (to, from) {
      this.configShowOptionsFromNet()
    },
    selectedProp (to, from) {
      this.langSwitch()
      this.selectedValue = to.toString()
    }
  }
}
</script>

<style scoped>
.single-select-layout {
    width: 200px;
    /*margin-top: 5px;*/
    text-align: center;
}
</style>
