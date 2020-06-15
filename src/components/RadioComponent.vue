<template>
  <div class="title-input-layout">
    <p class="title-layout" v-if="isMustProp"
       :class="[{'title-width-fit-layout' : isFitWidthProp}]"><span style="color: #E53646;">*&nbsp;</span>{{ $t(title) }}</p>
    <p class="title-layout" v-else
       :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ $t(title) }}</p>
    <div class="radio-content-layout">
       <el-radio v-model="radio" label="1" @change="radioChange">{{$t(optionallistProp[0])}}</el-radio>
       <el-radio v-model="radio" label="2" @change="radioChange">{{$t(optionallistProp[1])}}</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    isMustProp: false,
    isFitWidthProp: false,
    optionallistProp: Array
  },
  data () {
    return {
      radio: '1'
    }
  },
  methods: {
    radioChange () {
      this.$emit('radio-change-event', this.radio)
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.title-input-layout {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.title-layout {
  font-size: 14px;
  color: #484848;
  line-height: 35px;
  height: 35px;
  width: 150px;
  padding: 0 10px;
  text-align:right;
}

.title-width-fit-layout {
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  margin: 0 auto;
  width:auto;overflow:visible;
}
</style>
