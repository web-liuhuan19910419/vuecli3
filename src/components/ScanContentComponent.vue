/**
 * 扫描组件
 */
<template>
  <div class="search-layout">
    <p class="title-layout"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <input
      class="search-input-layout"
      :type="processIsNumber()"
      :placeholder="$t(placeHolderProp)"
      v-model="searchContent"
      :style="{'width': this.inputWidth}"
      @keyup.enter="searchAction"
      @keydown.tab.prevent="searchAction"
      />
  </div>
</template>

<script>
export default {
  props: {
    isEraseProp: {
      type: Boolean,
      default: false
    },
    title: '',
    isFitWidthProp: false,
    searchContentProp: {
      type: String,
      default: ''
    },
    placeHolderProp: '',
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
      if (this.searchContent.length > 0) {
        this.$emit('on-search', this.searchContent)
      }
      if (this.isEraseProp === true) {
        this.searchContent = ''
      }
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
  },
  watch: {
    'searchContent' (to, from) {
      console.log(to, to.length)
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
  }

  .search-input-layout {
    height: 32px;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 14px;
    border-radius:4px;
    border: 1.0px solid #fffcdf;
    padding-left: 10px;
    outline:none;
  }

  input::-webkit-input-placeholder {
    padding-left: 10px;
    color: #fffcdf;
  }
  .title-layout {
    font-size: 14px;
    color: #484848;
    line-height: 35px;
    height: 35px;
    width: 120px;
    padding: 5px 10px;
    text-align:right;
  }
  .title-width-fit-layout {
    width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;overflow:visible;
  }

</style>
