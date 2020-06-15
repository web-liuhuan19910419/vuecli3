/**
 * 权限控制组件
 */
<template>
  <div class="rights-layout">
    <div class="rights-title-layout" v-if="isMustProp"><span style="color: #E53646;">*&nbsp;</span>{{ $t(title) }}</div>
    <div class="rights-title-layout" v-else>{{ $t(title) }}</div>
    <div class="rights-config-layout">
      <ul>
        <li
          v-for="(rightsItem, index) in rightsList"
          :key="rightsItem.name"
          class="right-item-layout"
          @click="checkRights(index)">
            <img class="rights-check-img" :src="operationCheckedSrc(index)">
            <p class="rights-content-layout">{{ processContent(rightsItem.name) }}</p>
        </li>
      </ul>
    </div>
    <div :style="{'height': `${25 * this.processLayoutHeight()}px`}"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rightsListProp: Array,
    isSingleCheck: Boolean,
    isMustProp: false
  },
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    operationCheckedSrc (index) {
      if (this.rightsList[index].checked === true) {
        return require('../assets/images/radio_checked.png')
      } else {
        return require('../assets/images/radio_unchecked.png')
      }
    },
    checkRights (index) {
      if (this.isSingleCheck === true) {
        for (let index = 0; index < this.rightsList.length; index++) {
          this.rightsList[index].checked = false
        }
        this.rightsList[index].checked = true
      } else {
        this.rightsList[index].checked = !this.rightsList[index].checked
      }
      this.$emit('on-checked-confirm', this.rightsList)
    },
    processLayoutHeight () {
      if (this.rightsList.length % 4 === 0) {
        return parseInt(this.rightsList.length / 4)
      } else {
        return parseInt(this.rightsList.length / 4) + 1
      }
    },
    processContent (content) {
      if (content.indexOf('message.') === -1) {
        return content
      } else {
        return this.$t(content)
      }
    }
  },
  beforeMount () {
    this.rightsList = this.rightsListProp
  }
}
</script>

<style scoped>

.rights-title-layout {
  float: left;
  font-size: 14px;
  color: #484848;
  text-align: right;
  line-height: 25px;
  width: 200px;
  margin-right: 20px;
}

.right-item-layout {
  float: left;
  display: flex;
  justify-content: flex-start;
  line-height: 25px;
  width: 25%;
  cursor: pointer;
}

.rights-config-layout{
  margin-left: 150px;
}

.rights-check-img {
  width: 10px;
  height: 10px;
  margin-top: 7px;
}

.rights-content-layout {
  float: left;
  font-size: 14px;
  color: #969696;
  text-align: left;
  margin-left: 15px;
}

</style>
