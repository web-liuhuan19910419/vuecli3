<template>
  <div class="content-head-layout">
    <div class="sub-content-head">
      <slot name="head-slot-content">
      </slot>
    </div>
  </div>
</template>

<style scoped>
  .content-head-layout {
    height: 40px;
    width: calc(100% - 18px);
    background-color: white;
    padding-left: 18px;
  }
  .sub-content-head{
    margin-top: 4px;
    margin-bottom: -4px;
    float: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    /*margin-right: 10px;*/
  }

</style>
