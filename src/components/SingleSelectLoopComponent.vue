/**
 * 单选循环组件
 */
<template>
    <div class="single-select-layout">
        <el-select v-model="selectedValue" :placeholder="$t(selectPlaceholder)"  @change="selectMethod" size="mini">
            <el-option
                    v-for="(item, index) in showOption"
                    :key="item.value+index"
                    :label="item.name"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  props: {
    selectedProp: Number,
    selectPlaceholder: {
      type: String
    },
    options: {
      default: Array
    },
    isLocalData: true,
    indexProp: 0
  },
  data () {
    return {
      selectedValue: '',
      showOption: [],
      currentIndex: -1
    }
  },
  methods: {
    selectMethod (value) {
      this.$emit('on-select-change', {'content': Number.parseInt(value), 'index': this.indexProp})
    },
    langSwitch () {
      if (this.isLocalData === false) {
        return
      }
      this.showOption = []
      for (let index = 0; index < this.options.length; index++) {
        let element = this.options[index]
        let tmpItem = {}
        if (element.name.indexOf('message.') === -1) {
          tmpItem['name'] = element.name
        } else {
          tmpItem['name'] = this.$t(element.name)
        }
        tmpItem['value'] = (index).toString()
        this.showOption.push(tmpItem)
      }
      console.log('showOption =' + JSON.stringify(this.showOption))
    },
    configShowOptionsFromNet () {
      this.langSwitch()
    }
  },
  beforeMount () {
    this.langSwitch()
    if (this.selectedProp !== undefined && this.selectedProp === '-1') {
      this.selectedValue = this.selectedProp.toString()
    } else {
      this.selectedValue = ''
    }
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.selectedProp !== undefined && this.selectedProp === '-1') {
        this.selectedValue = this.selectedProp.toString()
      } else {
        this.selectedValue = ''
      }
    },
    options (to, from) {
      this.configShowOptionsFromNet()
    },
    selectedProp (to, from) {
      if (this.to !== undefined) {
        if (to === '-1') {
          this.selectedValue = ''
        } else {
          this.selectedValue = to.toString()
        }
      }
    }
  }
}
</script>

<style scoped>
.single-select-layout {
  width: 200px;
  height: 100%;
  margin-top: 4px;
}
</style>
