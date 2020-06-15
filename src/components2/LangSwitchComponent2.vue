<template>
  <div class="switch-lang-layout">
    <el-select v-model="value"  @change="langSwitch">
      <el-option
        v-for="item in cnList"
        :key="item.value"
        :label="item.label"
        size="mini"
        :value="item.value">
        <div style="diaplay: flex; align-items: center; justify-content: space-around;">
          <p style="float: left; text-align: left;">{{ item.value }}</p>
          <img :src="getUrl(item.value)"  :alt="item.value" style="width: 24px; height: 14px; vertical-align:middle; margin-left: 20px;">
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'LangSwitchComponent2',
  props: {
    cnListProp: {
      type: Array
    }
  },
  data () {
    return {
      cnList: [],
      value: 'ZH'
    }
  },
  methods: {
    langSwitch (value) {
      this.$emit('onLangSwitch', value)
    },
    getUrl (value) {
      if (value === 'ZH') {
        return require('../assets/images/zh.png')
      } else {
        return require('../assets/images/en.png')
      }
    }
  },
  beforeMount () {
    this.cnList = this.cnListProp
    console.log(this.cnList)
  }
}
</script>
<style scoped>
  .switch-lang-layout >>> .el-input__inner {
    width: 65px;
    border: 0;
    background-color: #3f91ed;
    color: white;
  }
</style>
