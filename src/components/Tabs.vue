<template>
  <div class="tabs-layout">
    <ul>
       <li v-for="(item, index) in quickLinkListProp" :key="item.name"
         @click="onClick(index)"
         :class="{'active':processReactIndex(index)}"
       >{{$t(item.name)}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    quickLinkListProp: Array,
    linkIndexProp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      linkIndex: -1
    }
  },
  methods: {
    onClick (index) {
      console.log(index)
      this.linkIndex = index
      this.$emit('on-linkindex-change', this.linkIndex)
    },
    processReactIndex (index) {
      if (this.linkIndex === -1) {
        return false
      } else {
        if (index === this.linkIndex) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {
    if (this.linkIndexProp !== undefined) {
      this.linkIndex = this.linkIndexProp
    }
  },
  watch: {
    linkIndexProp (to, from) {
      if (to !== undefined) {
        this.linkIndex = to
      }
    }
  }
}
</script>
<style scoped>
.tabs-layout {
  width: 100%;
  height: 40px;
}
ul {
    width: 100%;
    padding-left: 10px;
    padding-top: -1px;
    height: 40px;
    line-height: 40px;
    list-style: none;
    color:#215cb1;
    font-size: 14px;
}
li {
  height: 38px;
  padding-top: 16px;
  float: left;
  margin: 0;
  padding: 0;
  list-style: none;
  cursor: pointer;
}

li+li {
  margin-left: 30px;
}
.active {
  border-bottom: 2px solid #215cb1;
}
</style>
