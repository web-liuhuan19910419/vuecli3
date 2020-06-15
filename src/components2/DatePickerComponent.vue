<template>
  <div class="date-picker-layout">
    <el-date-picker
            v-model="optionDatePicker"
            align="right"
            type="date"
            :placeholder="this.$t('message.selectDate')"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePickerComponent',
  components: {
  },
  props: {
  },
  data () {
    return {
      optionDatePicker: '',
      currentLang: this.$i18n.locale,
      pickerOptions: {
        // 只能选择过去的时间或者进行中
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    processCurrentLang () {
      let lang = ''
      if (this.$i18n.locale === 'cn') {
        lang = 'zh'
      } else if (this.$i18n.locale === 'en') {
        lang = 'en'
      }
      return lang
    }
  },
  watch: {
    optionDatePicker (to, from) {
      if (to === null || to === undefined) {
        to = ''
      }
      this.$emit('on-option', to)
    }
  }
}
</script>

<style scoped>

.date-picker-layout {
  margin-left: 10px;
  margin-top: 5px;
}

</style>
