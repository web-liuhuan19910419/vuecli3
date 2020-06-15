/**
 * 登录页面下方说明模块item组件
 */
<template>
  <div class="instruction-item-layout">
    <h1>{{ instructionInfo.title }}</h1>
    <p>{{ instructionInfo.desc }}</p>
  </div>
</template>
<script>
export default {
  props: {
    instructionInfo: Object
  }
}
</script>

<style scoped>

.instruction-item-layout {
  width: 400px;
  height: 100%;
  float: left;
}

.instruction-item-layout h1 {
  margin-top: 40px;
  font-size: 18px;
  color: #484848;
  font-weight:bold;
}

.instruction-item-layout p {
  width: 300px;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 14px;
  color: #969696;
  line-height: 15px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

</style>
