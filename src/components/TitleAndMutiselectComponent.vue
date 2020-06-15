
<template>
  <div class="muti-select-layout">
     <p class="title-layout" v-if="isMustProp"><span class="must-flag-layout">*&nbsp;</span>{{TilteProp}}</p>
     <p class="title-layout" v-else>{{TilteProp}}</p>
     <div class="single-select-layout">
         <el-select v-model="selectedValue" :placeholder="$t('message.pleaseSelect')" @change="selectMethod" size="mini">
             <el-option
                     v-for="item in showOption"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
             </el-option>
         </el-select>
     </div>
  </div>
</template>

<script>
export default {
  name: 'TitleAndMutiselectComponent',
  components: {
  },
  props: {
    TilteProp: {
      default: String
    },
    selectedProp: Number,
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
      console.log(this.showOption)
      console.log(this.selectedValue)
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
      this.langSwitch(true)
    }
  },
  beforeMount () {
    this.langSwitch()

    if (this.selectedProp !== undefined && this.selectedProp !== -1) {
      this.selectedValue = this.selectedProp.toString()
    } else {
      this.selectedValue = ''
    }
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.selectedProp !== undefined && this.selectedProp !== -1) {
        this.selectedValue = this.selectedProp.toString()
      } else {
        this.selectedValue = ''
      }
    },
    options (to, from) {
      this.configShowOptionsFromNet()
    },
    selectedProp (to, from) {
      this.langSwitch()

      if (to !== undefined && to !== -1) {
        this.selectedValue = to.toString()
      } else {
        this.selectedValue = ''
      }
    }
  }
}
</script>

<style scoped>
  .muti-select-layout {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .single-select-layout {
   width: 150px;
   margin-left: 5px;
  }
  .title-layout {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  .must-flag-layout {
    color: #E53646;
  }
</style>
