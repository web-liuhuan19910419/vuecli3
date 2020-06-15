/**
 * 在内容Foot中，显示的页面切换组件
 */
<template>
  <div class="page-switch-layout">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @next-click="onGotoNextPage"
      @prev-click="onGotoLastPage"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="pageCount"
      layout="total, slot, sizes, prev, pager, next, jumper"
      :total="totalCount"
      on>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PageSwitchComponent2',
  props: {
    currentPageProp: Number,
    pageCountProp: Number,
    totalCountProp: Number
  },
  data () {
    return {
      currentPage: 0,
      pageCount: 20,
      totalCount: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('on-page-size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('on-current-change', val)
    },
    onGotoFirstPage () {
      this.$emit('on-first-page')
    },
    onGotoLastPage () {
      this.$emit('on-last-page')
    },
    onGotoNextPage () {
      this.$emit('on-next-page')
    },
    onGotoEndPage () {
      this.$emit('on-end-page')
    }
  },
  beforeMount () {
    if (this.currentPageProp !== undefined) {
      this.currentPage = this.currentPageProp
    }
    if (this.pageCountProp !== undefined) {
      this.pageCount = this.pageCountProp
    }
    if (this.totalCountProp !== undefined) {
      this.totalCount = this.totalCountProp
    }
  },
  watch: {
    'pageCountProp' (to, from) {
      if (this.pageCountProp !== undefined) {
        this.pageCount = this.pageCountProp
      }
    },
    'currentPageProp' (to, from) {
      if (this.currentPage !== undefined) {
        this.currentPage = this.currentPageProp
      }
    },
    'totalCountProp' (to, from) {
      if (this.totalCount !== undefined) {
        this.totalCount = this.totalCountProp
      }
    }
  }
}
</script>

<style scoped>
    .page-switch-layout {
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        color: #969696;
        padding-left: 10px;
        padding-right: 10px;
        float: right;
    }

    .slot-default {
        display: inline-block;
        width: 60px;
    }
</style>
