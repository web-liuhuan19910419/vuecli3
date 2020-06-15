/**
 * 搜索组件
 */
<template>
  <div class="search-layout">
    <p class="search-switch-title-layout">{{ $t('message.quickSearch.quickSearchTitle')}}</p>
    <single-select-component
      ref="select1"
      :selectedProp=0
      :options="options"
      @on-select-change="onSelectChange">
    </single-select-component>
    <input
      class="search-input-layout"
      type="text"
      :placeholder="$t(placeHolderProp)"
      v-model="searchContent"
      :style="{'width': this.inputWidth}"
      @keyup.enter="searchAction"/>
    <single-select-component
      style="margin-left:2px;"
      :selectedProp= 0
      :options="options2"
      @on-select-change="onSelectChange2">
    </single-select-component>
    <input
      class="search-input-layout"
      type="text"
      :placeholder="$t(placeHolderProp)"
      v-model="searchContent2"
      :style="{'width': this.inputWidth}"
      @keyup.enter="searchAction"/>
    <div class="search-button" @click.stop="searchAction" v-if="!hideSearchButtonProp"><img src="../assets/images/search.png" alt="search" style="margin-top: 6px;"></div>
  </div>
</template>

<script>
import SingleSelectComponent from '../components2/SingleSelectComponent'
import DateRangePickComponent from '../components2/DateRangePickComponent.vue'
export default {
  components: {
    SingleSelectComponent,
    DateRangePickComponent
  },
  props: {
    searchContentProp: {
      type: String,
      default: ''
    },
    searchContentProp2: {
      type: String,
      default: ''
    },
    placeHolderProp: '',
    hideSearchButtonProp: {
      type: Boolean,
      default: false
    },
    buttonNameProp: {
      type: String,
      default: 'message.quickSearch.searchTitle'
    },
    inputWidthProp: {
      type: Number,
      default: 150
    },
    options: Array,
    options2: Array
  },
  data () {
    return {
      searchContent: '',
      searchContent2: '',
      inputWidth: '200px',
      currentSearchTypeIndex: 1,
      currentSearchTypeIndex2: 1
    }
  },
  methods: {
    onSelectChange (index) {
      this.currentSearchTypeIndex = index + 1
      this.$emit('on-switch-search-index', this.currentSearchTypeIndex)
    },
    onSelectChange2 (index) {
      this.currentSearchTypeIndex2 = index + 1
      this.$emit('on-switch-search2-index', this.currentSearchTypeIndex2)
    },
    searchAction () {
      this.searchContent = this.searchContent.trim()
      this.searchContent2 = this.searchContent2.trim()
      this.$emit('on-search', this.searchContent, this.searchContent2)
    }
  },
  beforeMount () {
    if (this.inputWidthProp !== undefined) {
      this.inputWidth = this.inputWidthProp + 'px'
    }
    if (this.searchContentProp !== undefined) {
      this.searchContent = this.searchContentProp
    }
    if (this.searchContentProp2 !== undefined) {
      this.searchContent2 = this.searchContentProp2
    }
    this.defaultSelect1 = this.defaultSelectProp1
  },
  watch: {
    'searchContent' (to, from) {
      // console.log(to)
    }
  }
}
</script>

<style scoped>

  .search-layout {
    display: flex;
    justify-content: flex-start;
    width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    align-items: center;
    user-select:none;
  }

  .search-switch-title-layout {
    font-size: 14px;
    color: #484848;
   /* line-height: 45px;*/
    width: 40px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 2px;
  }

  input::-webkit-input-placeholder {
    padding-left: 10px;
    color: #d0d0d0;
  }

  .search-layout >>> .single-select-layout {
    width: 140px!important;
  }
  .search-layout >>> .el-select {
    margin-top: 4px;
    width: 100px!important;
    height: 28px!important;
  }
  .search-layout >>> .el-input__inner {
    background-color: #F5F7FA;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search-layout >>> .el-input-group__prepend {
    background-color: #fff!important;
  }
  .search-input-layout {
    width: 250px!important;
    height: 26px!important;
    margin-top: 4px;
    line-height: 26px;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    padding: 0 15px;
    outline:none;
  }
  .search-input-layout:focus {
    border: 1px solid #1989fa;
  }
  .search-button {
    width:30px;
    height: 26px;
    margin: 7px 0px 2px 0px;
    margin-left: 10px;
    border-radius:0 4px 4px 0;
    font-size: 14px;
    text-align: center;
    color: #696969;
    line-height: 26px;
    padding: 0px 8px 0px 8px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    cursor: pointer;
    border: 1.0px solid #d0d0d0;
    background-color: #F5F7FA;
  }

</style>
