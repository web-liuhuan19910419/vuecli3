<template>
  <transition name="fade">
    <div
      class="platform-mask"
      @click="emitHidden('点击阴影部分')"
      v-show="showStatusProp"
      :style="{'width':`${this.$globalConst.clientWidth() - this.$globalConst.menuComponentWidth - 2 * 15}px`,'height':`${this.$globalConst.clientHeight() - this.$globalConst.headComponentHeight - this.$globalConst.footComponentHeight - 10 * 2}px`}">
      <div class="platform-wrapper" :style="{'margin-right': this.platformWidth}">
        <div
          id="platform"
          class="platform-container"
          :style="platformStyleObject" @click.stop="ignoreEmitHidden">
            <div class="platform-content">
              <div class="platform-header"> {{ this.platformHeader }} </div>
              <div class="platform-body">
                <div class="sep-line-layout"></div>
                <div class="li-item-layout" @click.stop="onTotalSwitchChecked()">
                  <img
                    class="radio-button"
                    :src="totalCheckedSrc()">
                    <div class="li-item-name-layout">全选</div>
                </div>
                <div class="sep-line-layout"></div>
                <ul class="ul-layout">
                  <li v-for="(supplierItem, index) in this.$store.state.supplierAndPurchaseModule.groupsAndMembers[normalIndexProp].member_array" :key="supplierItem.mid">
                    <div class="li-item-layout"
                        :class="[{'li-item-index-layout' : supplierItem.checked}]"
                        @click.stop="onIndexItem(index)">
                    <img
                      class="radio-button"
                      :src="checkedSrc(index)">
                      <div class="li-item-name-layout">
                        {{supplierItem.passport}}
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
    normalIndexProp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      platformWidth: String, // 动态设置平台宽度
      platformStyleObject: Object, // v-bind:style 的样式

      platformHeader: '从供应商组中选取'
    }
  },
  methods: {
    onAddGroupAction (groupName) {
    },
    onIndexItem (index) {
      let suppliers = this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array
      suppliers[index].checked = !suppliers[index].checked
    },
    onTotalSwitchChecked () {
      let isTotalChecked = true
      if (this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length === 0) {
        isTotalChecked = false
      }
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length; index++) {
        let supplier = this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index]
        if (supplier.checked === false) {
          isTotalChecked = false
        }
      }

      // 如果当前是全选，那么转为全不选.
      if (isTotalChecked === true) {
        for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length; index++) {
          let supplier = this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index]
          supplier.checked = false
        }
      } else {
        for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length; index++) {
          let supplier = this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index]
          supplier.checked = true
        }
      }
    },
    emitHidden (message) {
      this.$emit('onPlatformLayoutHidden', message)
    },
    ignoreEmitHidden () {
    },
    // 多选radio的状态
    checkedSrc (index) {
      if (this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index].checked === null) {
        return ''
      } else if (this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index].checked === true) {
        return require('../../assets/images/radio_checked.png')
      } else if (this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index].checked === false) {
        return require('../../assets/images/radio_unchecked.png')
      }
    },
    totalCheckedSrc () {
      let isTotalChecked = true
      if (this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length === 0) {
        isTotalChecked = false
      }
      for (let index = 0; index < this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array.length; index++) {
        let supplier = this.$store.state.supplierAndPurchaseModule.groupsAndMembers[this.normalIndexProp].member_array[index]
        if (supplier.checked === false) {
          isTotalChecked = false
        }
      }

      if (isTotalChecked === true) {
        return require('../../assets/images/radio_checked.png')
      } else if (isTotalChecked === false) {
        return require('../../assets/images/radio_unchecked.png')
      }
    }
  },
  beforeMount () {
    this.platformWidth = this.platformWidthProp + 'px'
    this.platformStyleObject = {'width': this.platformWidth, 'margin-right': '-' + this.platformWidth, 'min-height': `${this.$globalConst.clientHeight() - this.$globalConst.headComponentHeight - this.$globalConst.footComponentHeight - 10 * 2}px`}
  }
}
</script>

<style scoped>

.platform-mask {
  position: absolute;
  overflow-y: scroll;
  z-index: 2;
  top: 90px;
  margin-left: auto;
  margin-right: auto;
  margin: 0 auto;
  width: 990px;
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
  font-family: Helvetica, Arial, sans-serif;
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

.ul-layout {
  margin-bottom: 40px;
}

.li-item-layout {
  display: flex;
  justify-content: flex-start;
  height: 36px;
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
