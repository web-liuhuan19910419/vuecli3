<template>
  <div class="muti-select-layout">
     <p class="title-layout" v-if="isMustProp"><span class="must-flag-layout">*&nbsp;</span>{{tilteProp}}</p>
     <p class="title-layout" v-else>{{tilteProp}}</p>
     <div class="single-select-layout">
       <el-select v-model="selectedValue" placeholder="$t('message.pleaseSelect')" @change="selectMethod" size="mini">
         <el-option
           v-for="item in showOption"
           :key="item.value"
           :label="$t(item.name)"
           :value="item.value">
         </el-option>
       </el-select>
     </div>
  </div>
</template>

<script>
export default {
  name: 'TitleAndMutiselectComponent2',
  components: {
  },
  props: {
    tilteProp: {
      default: String
    },
    selectedProp: String,
    selectPlaceholder: {
      type: String
    },
    optionsProp: {
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
      this.selectedValue = value
      this.$emit('on-select-change', this.selectedValue)
    },
    langSwitch () {
      if (this.optionsProp !== undefined) {
        this.showOption = []
        for (let index = 0; index < this.optionsProp.length; index++) {
          let element = this.optionsProp[index]
          let tmpItem = {}
          if (element.name.indexOf('message.') === -1) {
            tmpItem['name'] = element.name
          } else {
            tmpItem['name'] = this.$t(element.name)
          }
          tmpItem['value'] = element.value
          this.showOption.push(tmpItem)
        }
      }
    }
  },
  beforeMount () {
    this.langSwitch()
    if (this.selectedProp !== undefined) {
      this.selectedValue = this.selectedProp
    }
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.selectedProp !== undefined) {
        this.selectedValue = this.selectedProp.toString()
      }
    },
    optionsProp (to, from) {
      this.langSwitch()
    },
    selectedProp (to, from) {
      this.langSwitch()

      this.selectedValue = to
    }
  }
}
</script>

<style scoped>
  .muti-select-layout {
    margin-left: 10px;
    margin-top: 5px;
    display: flex;
  }
  .single-select-layout {
   width: 150px;
   margin-left: 5px;
  }
  .title-layout {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .must-flag-layout {
    color: #E53646;
  }
</style>
