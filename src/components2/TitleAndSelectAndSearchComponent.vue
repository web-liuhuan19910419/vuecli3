<template>
  <!--新的单组筛选查询组件-->
  <div class="input-search-layout">
    <p class="title-layout" align="center">{{$t('message.query')}}</p>
    <el-input :placeholder="$t('message.pleaseEnterContent')" v-model="searchContent" size="mini" class="input-with-select">
      <el-select v-model="selectOptionValue" slot="prepend" :placeholder="$t('message.pleaseSelect')" @change="onSelectChange">
        <el-option
          v-for="item in selectList"
          :key="item.name"
          :label="$t(item.name)"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSelectAndSearchComponent',
  props: {
    searchContentProp: {
      type: String,
      default: ''
    },
    optionsProp: Array
  },
  data () {
    return {
      selectOptionValue: '-1',
      searchContent: '',
      selectList: null
    }
  },
  methods: {
    onSelectChange (value) {
      this.selectOptionValue = value
      this.$emit('on-switch-search-index', this.selectOptionValue)
    },
    searchAction () {
      this.searchContent = this.searchContent.trim()
      this.$emit('on-search', this.searchContent, this.selectOptionValue)
    }
  },
  beforeMount () {
    if (this.searchContentProp !== undefined) {
      this.searchContent = this.searchContentProp
    }

    // if (this.selectOptionValueProp !== undefined) {
    //   this.selectOptionValue = this.selectOptionValueProp
    // }

    if (this.optionsProp !== undefined) {
      this.selectList = this.optionsProp
    }

    if (this.selectList.length > 0) {
      this.selectOptionValue = this.selectList[0].value
    }
  }
}
</script>

<style scoped>
  .title-layout {
    width: 50px;
    text-align: center;
  }
  .input-search-layout {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    font-size: 12px;
    width: 450px;
    align-items: center;
  }

  .el-input .el-select {
    width: 100px;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
