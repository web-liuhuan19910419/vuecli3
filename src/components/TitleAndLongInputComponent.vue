<template>
  <!--内容比较长的输入框 可以设置输入框长度以及title长度-->
  <div class="title-and-long-input-layout">
    <p class="title-layout" v-if="isMustProp"
       :style="{'width':  titleWidthProp}"><span style="color: #E53646;">*&nbsp;</span>{{ $t(titleProp) }}</p>
    <p class="title-layout" v-else  :style="{'width':  titleWidthProp}">{{ $t(titleProp) }}</p>
    <el-input
      :style="{'width': inputContentLengthProp}"
      type="textarea"
      autosize
      :placeholder="$t(placeHolderProp)"
      v-model="inputContent">
    </el-input>
  </div>
</template>

<script>
    export default {
      name: 'TitleAndLongInputComponent',
      props: {
        titleProp: {
          type: String,
          default: ''
        },
        titleWidthProp: {
          type: String,
          default: '100px'
        },
        inputContentLengthProp: { // 默认input框的长度
          type: String,
          default: '500px'
        },
        placeHolderProp: {
          type: String,
          default: 'message.hint.inputContentHint'
        }, // 默认占用符显示的内容
        inputContentProp: '', // 初始化设置input框里面显示的内容
        isMustProp: false // 是否为必填项
      },
      data () {
        return {
          inputContent: ''
        }
      },
      watch: {
        inputContent (to, from) {
          if (to !== undefined) {
            to = to.trim()
            this.$emit('on-input-content-change', to)
          }
        },
        inputContentProp (to, from) {
          if (to !== undefined) {
            this.inputContent = to
          }
        }
      },
      mounted () {
        console.log(this.isClearableProp)
        if (this.inputContentProp !== undefined) {
          this.inputContent = this.inputContentProp
        }
      }

    }
</script>

<style scoped>
  .title-and-long-input-layout {
    display: flex;
  }
  .title-layout {
    font-size: 14px;
    color: #484848;
    line-height: 35px;
    height: 35px;
    text-align: right;
    padding: 0 10px;
  }
</style>
