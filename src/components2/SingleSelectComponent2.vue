/**
* 单选组件
*/
<template>
    <div class="single-select-layout">
        <el-select v-model="selected" slot="prepend" size="mini" :placeholder="$t(selectPlaceholder)" @change="onSelectChange">
            <el-option
                    v-for="item in showOption"
                    :key="item.name"
                    :label="$t(item.name)"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>

export default {
  props: {
    selectedProp: Number,
    selectedNewProp: {
      type: String,
      default: ''
    },
    selectPlaceholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    isLocalData: {
      type: Boolean,
      default: true
    },
    isOldDataFlag: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data () {
    return {
      selected: '-1',
      selectLabel: '',
      showOption: []
    }
  },
  methods: {
    onSelectChange (value) {
      this.selected = value
      if (this.isOldDataFlag) {
        this.$emit('on-select-change', Number.parseInt(value))
      } else {
        this.$emit('on-select-change', value)
      }
    },
    langSwitch (flag) {
      if (flag === undefined && this.isLocalData === false) {
        return
      }
      this.showOption = []
      for (let index = 0; index < this.options.length; index++) {
        let element = this.options[index]
        if (this.isOldDataFlag) {
          let tmpItem = {}
          if (element.name.indexOf('message.') === -1) {
            tmpItem['name'] = element.name
          } else {
            tmpItem['name'] = this.$t(element.name)
          }
          tmpItem['value'] = index.toString()
          this.showOption.push(tmpItem)
        } else {
          this.showOption.push(element)
        }
      }
    },
    configShowOptionsFromNet () {
      this.showOption = []
      this.langSwitch(true)
    }
  },
  beforeMount () {
    if (this.isOldDataFlag) {
      if (this.selectedProp !== undefined) {
        this.selected = this.selectedProp.toString()
      }
    } else {
      this.selected = this.selectedNewProp
    }

    this.langSwitch()
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.isOldDataFlag) {
        if (this.selectedProp !== undefined) {
          this.selected = this.selectedProp.toString()
        }
      } else {
        this.selected = this.selectedNewProp
      }
    },
    options (to, from) {
      this.configShowOptionsFromNet()
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
