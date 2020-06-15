<template>
  <div class="grid-layout">
    <!--详情里面用的表格没有复杂的样式的-->
    <div>
      <table v-if="isColFixedWidth" style="background-color: white;border:solid #ffffff;border-width:1px 1px 1px 1px;width: 100%;word-break:break-all;table-layout:fixed;">
        <thead>
        <tr @click.stop="clickRowReset">
          <th width="3%"></th>
          <th v-for="(key, index) in titles" :key="key" v-html="processTitle(index)" :width="processWidths(index)" :style="{'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px', 'cursor': 'pointer', 'font-weight': '500'}"  @click.stop="onSwitchSort(index)">
          </th>
          <th :width="processActionWidth()"></th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(entry, rowIndex) in data"
          :key="entry.name">
          <td
            class="muti-choice-td-layout"
            :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
            @click.stop="mutiChoiceItem(rowIndex)">
            <img
              v-if="isSupportMutiChoice"
              class="radio-button"
              style="z-index:1"
              :src="choiceSrc(rowIndex)">
          </td>
          <td
            v-for="(key) in columns"
            :key="key.name"
            :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
            @click.stop="singleClickItem(rowIndex, key)" v-html="processHTMLData(entry[key])"
            :style="{'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px'}">
          </td>
          <td style="width: 150px; text-align: left;">
            <button v-for="(action, index) in actions" :key=action.name
              :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
              @click.stop="onActions(index,rowIndex)"
              size="small"
              style="border: none;color: #215cb1; cursor: pointer;background-color: transparent;width: 70px;font-size: 14px; outline:none;">{{ $t(actions[index].name) }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    // 页面名称
    titles: Array,
    // arrow信息. 0为隐藏 1为平序 2为降序  3为升序
    arrows: Array,
    // 跳转变色.
    // 指示变色index，color颜色，增加跳转...
    jumpColorList: Array,
    // 数据接口
    data: Array,
    // 是否支持多选接口
    isSupportMutiChoice: false,
    // 支持的操作
    actions: Array,
    // CheckAllComponent用来影响GridComponent的全选或全不选状态的变量
    isCheckAllToGridProp: false,
    // 变色List
    colorListProp: Array,
    // 新增Option All 同步选中状态数据.
    optionAllProp: Array,
    isDynamicColumnActions: false, // 动态绑定文字按钮，每一行不同
    isColFixedWidth: false, // 可以设置每个列的长度的
    isColDynamicWidth: false, // 正常的自适应
    isDynamicActionsAndMutichoose: false, // 动态绑定文字按钮，每一行不同，并且支持选择 多学 禁选等功能
    titleWidths: Array,
    originData: Array
  },
  data () {
    return {
      actionChineseCharWidth: 14,
      actionButtonWidth: 86,
      actionButtonHorizonPadding: 10,
      currentClickRow: -1,
      mutiChoiceArr: [],
      mutiChoiceArr1: [],
      GridCheckAllLocal: false,
      optionAll: []
    }
  },
  computed: {
    columns () {
      let singleColumnKeys = []
      if (this.data.length > 0) {
        for (const key in this.data[0]) {
          singleColumnKeys.push(key)
        }
      }
      return singleColumnKeys
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    processTitle (index) {
      let key = ''
      if (this.arrows === undefined) {
        key = this.$t(this.titles[index])
      } else {
        if (this.arrows[index].arrow === 0) {
          key = this.$t(this.titles[index])
        } else if (this.arrows[index].arrow === 1) {
          key = this.$t(this.titles[index]) + '▶'
        } else if (this.arrows[index].arrow === 2) {
          key = this.$t(this.titles[index]) + '▼'
        } else if (this.arrows[index].arrow === 3) {
          key = this.$t(this.titles[index]) + '▲'
        }
      }
      return key
    },
    processWidths (index) {
      return this.titleWidths[index]
    },
    processActionWidth () {
      return this.titleWidths[this.titleWidths - 1]
    },

    onSwitchSort (index) {
      if ((this.arrows === undefined) || this.arrows[index].arrow === 0) {
        return
      }
      let item = 0
      if (this.arrows[index].arrow === 1) {
        item = 2
      } else if (this.arrows[index].arrow === 2) {
        item = 3
      } else if (this.arrows[index].arrow === 3) {
        item = 2
      }
      for (let i = 0; i < this.arrows.length; i++) {
        if (i === index) {
          Vue.set(this.arrows[index], 'arrow', item)
        } else {
          if (this.arrows[i].arrow !== 0) {
            Vue.set(this.arrows[i], 'arrow', 1)
          }
        }
      }
      this.$emit('on-arrow-change', index, item)
    },
    // 多选radio的状态
    choiceSrc (rowIndex) {
      if (this.mutiChoiceArr[rowIndex].checked === null) {
        return ''
      } else if (this.mutiChoiceArr[rowIndex].checked === true) {
        return require('../assets/images/radio_checked2.png')
      } else if (this.mutiChoiceArr[rowIndex].checked === false) {
        return require('../assets/images/radio_unchecked2.png')
      }
    },
    choiceSrc1 (rowIndex) { // 有禁用状态的选择
      if (this.mutiChoiceArr1[rowIndex].checked === null) {
        return ''
      } else if (this.mutiChoiceArr1[rowIndex].checked === '1') {
        return require('../assets/images/radio_checked2.png')
      } else if (this.mutiChoiceArr1[rowIndex].checked === '0') {
        return require('../assets/images/radio_unchecked2.png')
      } else if (this.mutiChoiceArr1[rowIndex].checked === '2') {
        return require('../assets/images/radio_disabled2.png')
      }
    },
    mutiChoiceItem (rowIndex) {
      if (this.isSupportMutiChoice === false) {
        return
      }
      let itemStatus = this.mutiChoiceArr[rowIndex].checked
      itemStatus = !itemStatus
      this.mutiChoiceArr[rowIndex].checked = itemStatus
      this.$emit('on-index-change', rowIndex, itemStatus)
    },
    mutiChoiceItem1 (rowIndex) { // 有禁用状态的多选
      if (this.isSupportMutiChoice === false) {
        return
      }
      let itemStatus = this.mutiChoiceArr1[rowIndex].checked
      itemStatus = itemStatus === '2' ? '2' : itemStatus === '1' ? '0' : '1'
      this.mutiChoiceArr1[rowIndex].checked = itemStatus
      this.$emit('on-index-change', rowIndex, itemStatus)
    },
    // 单选操作
    singleClickItem (rowIndex, key) {
      if (this.hitJump(key)) {
        this.$emit('on-hit-row-column', rowIndex, key)
        return
      }
      if (this.currentClickRow === rowIndex) {
        this.currentClickRow = -1
      } else {
        this.currentClickRow = rowIndex
      }
    },
    clickRowReset () {
      this.currentClickRow = -1
    },
    onActions (actionIndex, rowIndex) {
      this.$emit('on-table-actions', actionIndex, rowIndex)
      this.currentClickRow = -1
    },
    initMutiChoiceArr () {
      // 添加选择数据
      this.mutiChoiceArr = []
      if (this.data === undefined || this.data.length === 0) {
        return
      }
      for (let index = 0; index < this.data.length; index++) {
        let element = {}
        element.checked = false
        this.mutiChoiceArr.push(element)
      }
    },
    initMutiChoiceArr1 () { // 有禁用状态的选择初始化
      // 添加选择数据
      console.log('进来设置初始化')
      console.log(this.originData)
      this.mutiChoiceArr1 = []
      for (let index = 0; index < this.originData.length; index++) {
        let element = {}
        if (this.originData[index].originCheckIndex === '0') {
          element.checked = '0'
        } else {
          element.checked = '2'
        }
        this.mutiChoiceArr1.push(element)
      }
    },
    changeMutiChoiceArr1 () { // 当arriginData 变化的时候
      this.mutiChoiceArr1 = []
      for (let index = 0; index < this.originData.length; index++) {
        let element = {}
        if (this.originData[index].originCheckIndex === '0') {
          element.checked = this.originData[index].checked
        } else {
          element.checked = '2'
        }
        this.mutiChoiceArr1.push(element)
      }
    },
    processHTMLData (htmlData) {
      htmlData = htmlData.toString()
      // 获取Prime数据
      let primeStartIndex = htmlData.indexOf('<p target="_blank"')
      let primeContent = ''
      if (primeStartIndex !== -1) {
        primeContent = htmlData.substring(primeStartIndex, htmlData.length)
        htmlData = htmlData.substring(0, primeStartIndex)
      }

      // 获取商品链接数据
      let linkStartIndex = htmlData.indexOf('<a target="_blank"')
      let linkContent = ''
      if (linkStartIndex !== -1) {
        linkContent = htmlData.substring(linkStartIndex, htmlData.length)
        htmlData = htmlData.substring(0, linkStartIndex)
      }

      if (htmlData.indexOf('<br>') === -1) {
        return htmlData
      } else {
        let htmlList = htmlData.split('<br>')
        let processedList = []
        for (let index = 0; index < htmlList.length; index++) {
          let element = htmlList[index]
          if (element.indexOf(':') === -1) {
            processedList.push(element)
          } else {
            let processingList = []
            processingList[0] = element.substring(0, element.indexOf(':'))
            processingList[1] = element.substring(element.indexOf(':') + 1, element.length)
            // let processingList = element.split(':')
            // UPC变色.
            if (processingList[0].toUpperCase() === 'UPC') {
              processingList[1] = '<span style="color:red;">' + processingList[1] + '</span>'
            }
            // 商品名称变色.
            if ((processingList[0].toUpperCase() === 'PRODUCT NAME') || processingList[0].toUpperCase() === '商品名称') {
              processingList[1] = '<span style="color:#215cb1;">' + processingList[1] + '</span>'
            }
            // 需要变色跳转操作
            let hitIndex = this.hitContent(processingList[0].toUpperCase())
            if (hitIndex !== -1) {
              let processStyle = ''
              if (this.jumpColorList[hitIndex].colorFit !== undefined) {
                if (this.jumpColorList[hitIndex].colorFit.indexOf(processingList[1]) !== -1) {
                  processStyle = '<span style="color:' + this.jumpColorList[hitIndex].color + '; cursor: pointer; font-weight:bold;">'
                } else {
                  processStyle = '<span style="cursor: pointer; font-weight:bold;">'
                }
              } else {
                processStyle = '<span style="color:' + this.jumpColorList[hitIndex].color + '; cursor: pointer; font-weight:bold;">'
              }
              processingList[1] = processStyle + processingList[1] + '</span>'
            }
            let info = processingList[1]
            processedList.push(info)
          }
        }
        let processedInfo = ''
        for (let index = 0; index < processedList.length; index++) {
          if (index !== processedList.length - 1) {
            processedInfo += processedList[index] + '<br>'
          } else {
            processedInfo += processedList[index]
          }
        }
        // 在尾部添加Prime
        if (primeContent.length > 0) {
          processedInfo += primeContent
        }

        // 在尾部添加商品链接
        if (linkContent.length > 0) {
          processedInfo += linkContent
        }
        return processedInfo
      }
    },
    hitContent (currentContent) { // 可以点击的字体选择哪种颜色
      let index = -1
      if ((this.jumpColorList === undefined) || (this.jumpColorList.length === 0)) {
        index = -1
      } else {
        for (let i = 0; i < this.jumpColorList.length; i++) {
          if (this.$t(this.jumpColorList[i].title).toUpperCase() === currentContent.toUpperCase()) {
            index = i
            break
          }
        }
      }
      return index
    },
    hitJump (key) { // 看看是不是点击到了可以点击的字体
      let isHitJump = false
      if (this.jumpColorList === undefined) {
        return isHitJump
      }
      for (let index = 0; index < this.jumpColorList.length; index++) {
        if (this.jumpColorList[index].title === key) {
          isHitJump = true
        }
      }
      return isHitJump
    }
  },
  created () {
    console.log(this.originData)
  },
  beforeMount () {
    this.colorList = this.colorListProp
    if (!this.isDynamicActionsAndMutichoose) {
      this.initMutiChoiceArr()
    } else {
      console.log('是这里')
      this.initMutiChoiceArr1()
    }
    if (this.optionAllProp !== undefined) {
      this.optionAll = this.optionAllProp
    }
  },
  watch: {
    'data' (to, from) {
      if (!this.isDynamicActionsAndMutichoose) {
        this.initMutiChoiceArr()
      } else {
        this.changeMutiChoiceArr1()
      }
    },
    // 观察isCheckAllToGridProp变化，调整GridComponent全选或全不选
    'isCheckAllToGridProp' (to, from) {
      this.GridCheckAllLocal = this.isCheckAllToGridProp
      for (let index = 0; index < this.mutiChoiceArr.length; index++) {
        let element = this.mutiChoiceArr[index]
        element.checked = to
      }
    },
    'colorListProp' (to, from) {
      this.colorList = this.colorListProp
    },
    optionAllProp: {
      handler (to, from) {
        this.optionAll = to
        if (this.mutiChoiceArr !== undefined && this.optionAll !== undefined) {
          for (let index = 0; index < this.mutiChoiceArr.length; index++) {
            this.mutiChoiceArr[index].checked = this.optionAll[index].checked
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.operation-layout {
  clear: both;
  overflow: hidden;
  height: 40px;
  margin-top: -20px;
  background: #e4eefd;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: flex-start;
  padding: 0px 10px;
}

.operation-action-content {
  height: 40px;
  padding: 0px 20px;
  color: #215cb1;
  font-size: 14px;
}

.muti-choice-td-layout {
  width: 40px;
  height: 40px;
}

.radio-button {
  width: 30px;
  height: 30px;
}

.click-row-style {
  background-color: #ffffff;
  vertical-align: middle;
}

.line-bg-style {
  background: #f0f0f0;
}

/*table {*/
/*  background-color: white;*/
/*  border:solid #ffffff;*/
/*  border-width:1px 1px 1px 1px;*/
/*  width: 100%;*/
/*  word-break:break-all;*/
/*  table-layout:fixed;*/
/*}*/

tr {
  background: #f9f9f9
}

tr:hover{background-color: #ffffff;}

th {
  background-color: #ffffff;
  color: #484848;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0px 0px;
  text-align: center;
}

td {
  color: #484848;
  vertical-align: middle;
  font-size: 12px;
  border:solid #ffffff;
  border-width:0px 1px 1px 0px;
  height: 20px;
  line-height: 20px;
  padding: 10px 0px;
  text-align: center;
}

</style>
