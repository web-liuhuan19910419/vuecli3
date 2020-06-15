<template>
  <div class="content-foot-layout">
    <div class="sub-content-foot">
      <slot name="foot-slot-content"></slot>
    </div>
  </div>
</template>

<style scoped>
.content-foot-layout {
  height: 45px;
  background: white;
  width: 100%;
}
.sub-content-foot{
  margin-top: 8px;
  margin-bottom: -8px;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
</style>
