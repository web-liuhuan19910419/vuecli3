/**
 * 旧的单个搜索组件
 */
<template>
  <div class="search-layout">
    <p class="search-switch-title-layout">{{ $t('message.quickSearch.quickSearchTitle')}}</p>
    <single-select-component
      :selectedProp= 0
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
    <div class="search-button" @click.stop="searchAction" v-if="!hideSearchButtonProp">
      <img src="../assets/images/search.png" alt="search" style="text-align: center;margin-top: 5px">
    </div>
  </div>
</template>

<script>
import SingleSelectComponent from '../components2/SingleSelectComponent'
export default {
  components: {
    SingleSelectComponent
  },
  props: {
    searchContentProp: {
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
      default: 200
    },
    options: Array
  },
  data () {
    return {
      searchContent: '',
      inputWidth: '200px',
      currentSearchTypeIndex: 1
    }
  },
  methods: {
    onSelectChange (index) {
      this.currentSearchTypeIndex = index + 1
      this.$emit('on-switch-search-index', this.currentSearchTypeIndex)
    },
    searchAction () {
      this.searchContent = this.searchContent.trim()
      this.$emit('on-search', this.searchContent)
    }
  },
  beforeMount () {
    if (this.inputWidthProp !== undefined) {
      this.inputWidth = this.inputWidthProp + 'px'
    }
    if (this.searchContentProp !== undefined) {
      this.searchContent = this.searchContentProp
    }
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
    width:-moz-fit-content;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    align-items: center;
    text-align: center;
  }

  .search-switch-title-layout {
    font-size: 12px;
    color: #484848;
    width: 35px;
    text-align: left;
    margin-right: 10px;
  }
  .search-layout >>> .el-select {
    width: 150px!important;
    /*height: 28px!important;*/
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
    /*line-height: 26px;*/
    font-size: 14px;
    border: 1px solid #d0d0d0;
    padding: 0 15px;
    outline:none;
  }
  .search-input-layout:focus {
    border: 1px solid #1989fa;
  }
  input::-webkit-input-placeholder {
    padding-left: 10px;
    color: #d0d0d0;
  }

  .search-button {
    width:30px;
    height: 26px;
    margin: 0px 0px 0px 0px;
    border-radius:0 4px 4px 0;
    font-size: 14px;
    text-align: center;
    color: #696969;
    line-height: 2px;
    padding: 0px 8px 0px 8px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    cursor: pointer;
    border: 1.0px solid #d0d0d0;
    border-left: 0;
    background-color: #F5F7FA;
  }

</style>
