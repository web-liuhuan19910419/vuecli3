/**
 * 搜索组件
 */
<template>
  <div class="search-layout">
      <el-input
              class="search-input-layout item-margin-right-layout"
              type="processIsNumber()"
              :placeholder="$t(placeHolderProp)"
              v-model="searchContent"
              :style="{'width': this.inputWidth}"
              @keyup.enter="searchAction" />
      <el-button type="primary" @click.stop="searchAction">{{ $t(buttonNameProp) }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    searchContentProp: {
      type: String,
      default: ''
    },
    placeHolderProp: '',
    buttonNameProp: {
      type: String,
      default: 'message.quickSearch.searchTitle'
    },
    inputWidthProp: {
      type: Number,
      default: 200
    },
    isNumberProp: false
  },
  data () {
    return {
      searchContent: '',
      inputWidth: '200px'
    }
  },
  methods: {
    searchAction () {
      this.searchContent = this.searchContent.trim()
      this.$emit('on-search', this.searchContent)
    },
    processIsNumber () {
      return this.isNumberProp ? 'number' : 'text'
    }
  },
  beforeMount () {
    if (this.inputWidthProp !== undefined) {
      this.inputWidth = this.inputWidthProp + 'px'
    }
    if (this.searchContentProp !== undefined) {
      this.searchContent = this.searchContentProp
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
  }

  .search-input-layout {
    font-size: 14px;
    padding-left: 10px;
    outline:none;
  }

</style>
