/**
 * 搜索组件
 */
<template>
  <div class="search-layout">
    <p class="search-switch-title-layout">{{ $t('message.quickSearch.quickSearchTitle')}}</p>
    <el-input :placeholder="$t('message.pleaseEnterContent')" v-model="searchContent" size="mini" class="input-with-select" :style="{ 'width': this.inputWidth }">
      <el-select v-model="currentSearchTypeValue" slot="prepend" :placeholder="$t('message.pleaseSelect')" @change="onSelectChange" :style="{ 'width': '140px' }">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="$t(item.name)"
          :value="item.value">
        </el-option>
      </el-select>
    </el-input>
    <el-input :placeholder="$t('message.pleaseEnterContent')" v-model="searchContent2" size="mini" class="input-with-select2" :style="{ 'width': this.inputWidth }">
      <el-select v-model="currentSearchTypeValue2" slot="prepend" :placeholder="$t('message.pleaseSelect')" @change="onSelectChange2" :style="{ 'width': '140px' }">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="$t(item.name)"
          :value="item.value">
        </el-option>
      </el-select>
    </el-input>
    <el-button icon="el-icon-search" @click="searchAction"></el-button>
  </div>
</template>

<script>
export default {
  name: 'SuperMutisearchComponent2',
  components: {
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
      default: 440
    },
    options: Array,
    options2: Array
  },
  data () {
    return {
      searchContent: '',
      searchContent2: '',
      inputWidth: '440px',
      currentSearchTypeValue: '',
      currentSearchTypeValue2: ''
    }
  },
  methods: {
    onSelectChange (value) {
      this.currentSearchTypeValue = value
      this.$emit('on-switch-search-value', this.currentSearchTypeValue)
    },
    onSelectChange2 (value) {
      this.currentSearchTypeValue2 = value
      this.$emit('on-switch-search2-value', this.currentSearchTypeValue2)
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
    align-items: center;
  }

  .search-switch-title-layout {
    font-size: 12px;
    color: #484848;
    width: 40px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .input-with-select2 {
    margin-left: 2px;
  }

</style>
