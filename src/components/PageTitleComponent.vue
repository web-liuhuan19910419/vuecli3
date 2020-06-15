/**
 * 在登录和注册相关页面上的顶部Page Title组件
 */
<template>
  <div class="title-container">
    <div class="name-layout">{{ title }}</div>
    <div class="name-line"></div>
    <div class="sep-line"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

 <style scoped>
 .name-layout {
  color: #215cb1;
  font-size: 24px;
  line-height: 60px;
  margin:0px auto
}

.name-line {
  background: #215cb1;
  width: 160px;
  height: 4px;
  margin:-10px auto;
}

.sep-line {
  background: #215cb1;
  width: 100%;
  height: 1px;
  margin:10px auto;
}
</style>
