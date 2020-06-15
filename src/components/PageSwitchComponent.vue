/**
* 在内容Foot中，显示的页面切换组件
*/
<template>
    <div class="page-switch-layout">
        <p class="page-content" v-if="pageCount > 0"> {{ this.procesFormat() }} </p>
        <div class="page-button" @click="onGotoFirstPage">{{$t('message.pageSwitch.firstPage')}}</div>
        <div class="page-button" @click="onGotoLastPage">{{$t('message.pageSwitch.lastPage')}}</div>
        <div class="page-button" @click="onGotoNextPage">{{$t('message.pageSwitch.nextPage')}}</div>
        <div class="page-button" @click="onGotoEndPage">{{$t('message.pageSwitch.endPage')}}</div>
    </div>
</template>

<script>
  export default {
    props: {
      currentPageProp: Number,
      pageCountProp: Number
    },
    data () {
      return {
        currentPage: 0,
        pageCount: 0
      }
    },
    methods: {
      procesFormat () {
        if (this.$i18n.locale === 'cn') {
          return '第' + (this.currentPage + 1).toString() + '页' + ' ' + '/' + ' ' + '共' + this.pageCount.toString() + '页' + ' '
        } else if (this.$i18n.locale === 'en') {
          return 'Page' + ' ' + (this.currentPage + 1).toString() + ' ' + 'of' + ' ' + this.pageCount.toString() + ' '
        }
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
        margin-top: 8px;
        margin-bottom: 8px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .page-button {
        padding-left: 10px;
        padding-right: 10px;
        cursor:pointer;
    }

    .page-content {
        font-size: 14px;
        color: #969696;
        min-width: 200px;
    }

</style>
