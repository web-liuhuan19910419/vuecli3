<template>
  <transition name="fade">
    <div
      class="platform-mask"
      @click="emitHidden('-1')"
      v-show="showStatusProp"
      :style="{'width':`${this.$globalConst.clientWidth() - this.$globalConst.menuComponentWidth - 2 * 15}px`,'height':`${this.$globalConst.clientHeight() - this.$globalConst.headComponentHeight - this.$globalConst.footComponentHeight - 10 * 2}px`}">
      <div class="platform-wrapper" :style="{'margin-right': this.platformWidth}">
        <div
          id="platform"
          class="platform-container"
          :style="platformStyleObject" @click.stop="ignoreEmitHidden">
            <div class="platform-content">
              <div class="platform-header"> {{ $t('message.supplierAndPurchase.addToSupplierGroup') }} </div>
              <search-component class="add-group-input-layout"
                placeHolderProp='message.supplierAndPurchase.newSupplierGroup'
                :inputWidthProp=150
                buttonNameProp='message.supplierAndPurchase.addButton'
                @on-search="onAddGroupAction">
              </search-component>
              <div class="platform-body">
                <ul class="ul-layout">
                  <li v-for="(groupInfo, index) in groupInfoArr" :key="groupInfo.gid">
                    <div class="li-item-layout"
                        :class="[{'li-item-index-layout' : (indexNumber === index)}]"
                        @click.stop="onIndexItem(index)">
                      <div class="li-item-name-layout">
                        {{groupInfo.name}}
                      </div>
                      <div class="li-item-number-layout">
                        {{groupInfo.count}}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchComponent from '@/components2/SearchComponent'
import supplierAndPurchase from '../../apis/supplierAndPurchase.js'
export default {
  components: {
    SearchComponent
  },
  props: {
    showStatusProp: false,
    button: String,
    platformWidthProp: {
      type: Number,
      default: 300
    },
    interflowNumber: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      platformWidth: String, // 动态设置平台宽度
      platformDiv: Object, // 操作的div
      platformStyleObject: Object, // v-bind:style 的样式

      platformButtonName: '确定',
      groupInfoArr: [],
      indexNumber: -1
    }
  },
  methods: {
    onAddGroupAction (groupName) {
      if (groupName.length === 0) {
        this.$toast(this.$t('message.hint.inputNewSupplierNameHint'))
      } else {
        supplierAndPurchase.requestCreateMySupplierGroup(groupName).then((responseData) => {
          if (responseData.result === '1') {
            this.fetchMySupplierGroups()
            this.$toast(this.$t('message.hint.newSupplierGroupSuccessHint'))
          } else {
            this.$toast(responseData.msg)
          }
        })
      }
    },
    onIndexItem (index) {
      this.indexNumber = index
      let gid = this.groupInfoArr[this.indexNumber].gid
      this.emitHidden(gid)
    },
    emitHidden (message) {
      this.$emit('onPlatformLayoutHidden', message)
    },
    ignoreEmitHidden () {
    },
    fetchMySupplierGroups () {
      supplierAndPurchase.requestFetchMySupplierGroups().then((responseData) => {
        if (responseData.result === '1') {
          this.groupInfoArr = responseData.data
        }
      })
    }
  },
  beforeMount () {
    this.platformWidth = this.platformWidthProp + 'px'
    this.platformStyleObject = {'width': this.platformWidth, 'margin-right': '-' + this.platformWidth, 'min-height': `${this.$globalConst.clientHeight() - this.$globalConst.headComponentHeight - this.$globalConst.footComponentHeight - 10 * 2}px`}
  },
  mounted () {
    this.platformDiv = document.getElementById('platform')
  },
  watch: {
    showStatusProp (to, from) {
      if (to === true) {
        this.fetchMySupplierGroups()
      }
    }
  }
}
</script>

<style scoped>

.platform-mask {
  position: absolute;
  overflow-y: scroll;
  z-index: 1000;
  top: 90px;
  margin-left: auto;
  margin-right: auto;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, .2);
  /* display: table; */
  font-family: Helvetica Neue, Arial, sans-serif;
  color: #444;
}

.platform-wrapper {
  display: table-cell;
  vertical-align: middle;
  float: right;
}

.platform-container {
  height: 100%;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
  /* transition: all .3s ease; */
  font-family: Helvetica, Arial, sans-serif;
  /* 设置 platform-default-button 居 platform-container 底部 需要先设置 position:relative; */
  position:relative;
}

.add-group-input-layout {
  padding: 10px 0px 0px 0px;
}

.sep-line-layout {
  width: 100%;
  height: 1px;
  background-color: #215cb1;
}

.platform-default-button {
  color: white;
  background-color: #215cb1;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  text-align: center;
  /* 设置 platform-default-button 居 platform-container 底部 需要下面三行语法 以及需要设置 platform-container position relative*/
  /* position:absolute; */
  /* left:0; */
  /* bottom:0; */
  z-index: 100;
  position:absolute;
  left:0;
  bottom:0;
}

.platform-header {
  margin-top: 0;
  color: #484848;
  font-size: 14px;
  text-align: left;
  padding: 20px 0px 10px 20px;
}

.platform-interflow-number {
  color: #484848;
  font-size: 14px;
  text-align: left;
  padding: 10px 0px 10px 20px;
}

.platform-body {
  margin: 10px 0;
  font-size: 14px;
  color: #484848;
  overflow:auto;
}

.li-item-layout {
  height: 40px;
}

.li-item-index-layout {
  background: #d0d0d0;
}

.li-item-name-layout {
  float: left;
  line-height: 40px;
  margin-left: 20px;
}

.li-item-number-layout {
  float: right;
  line-height: 40px;
  margin-right: 10px;
}

.radio-button {
  width: 10px;
  height: 10px;
  margin: 15px 0px 15px 10px;
}

.li-item-status {
  line-height: 20px;
  font-size: 14px;
  color: #484848;
  float: left;
  width: 100%;
  margin-left: 20px;
  margin-top: 20px;
  text-align: left;
}

.ul-layout {
  margin-bottom: 40px;
}

.li-item-time {
  line-height: 20px;
  font-size: 14px;
  color: #969696;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}

.fade-enter-active {
  transition: all .1s ease;
}
.fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
{
  transform: translateX(5px);
  opacity: 0;
}

</style>
