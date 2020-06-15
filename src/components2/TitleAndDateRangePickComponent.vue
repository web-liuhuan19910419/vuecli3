<template>
  <div class="date-picker-layout">
    <span class="title-layout">{{$t('message.gridTitles.dateRange')}}</span>
    <el-date-picker style="width: 230px;"
                                   v-model="optionDatePicker"
                                   align="right"
                                   type="daterange"
                                   :picker-options="getPickerOptions()"
                                   format="yyyy-MM-dd"
                                   value-format="yyyyMMdd"
                                   unlink-panels
                                   range-separator="-"
                                   :start-placeholder="this.$i18n.locale === 'cn' ? '开始日期' : 'Start Date'"
                                   :end-placeholder="this.$i18n.locale === 'cn' ? '结束日期' : 'End Date'">
  </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'TitleAndDateRangePickComponent',
  components: {
  },
  props: {
  },
  data () {
    return {
      optionDatePicker: '',
      currentLang: this.$i18n.locale,
      pickerOptions: {
      }
    }
  },
  methods: {
    getPickerOptions () {
      if (this.currentLang === 'cn') {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
          // , {
          //   text: '最近三个月',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          //     picker.$emit('pick', [start, end])
          //   }
          // }
          ]
        }
      } else {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: 'Last week',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
          // , {
            //   text: 'Last three months',
            //   onClick (picker) {
            //     const end = new Date()
            //     const start = new Date()
            //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            //     picker.$emit('pick', [start, end])
            //   }
            // }
          ]
        }
      }
    }
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.currentLang = to
    },
    optionDatePicker (to, from) {
      if (to === null || to === undefined) {
        to = ['', '']
      }
      this.$emit('on-option', to)
    }
  }
}
</script>

<style scoped>

.date-picker-layout {
  margin-top: 5px;
}
.title-layout {
  font-size: 12px;
}
.date-picker-layout >>> .mx-input {
  height: 30px;
}
</style>
