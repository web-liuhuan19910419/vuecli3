<template>
  <div style="text-align: left;">
    <el-dialog :title="this.$t(titleProp)" :visible.sync="visibleProp" v-if="visibleProp" :close-on-click-modal="false" :before-close="closeDialog" :width="this.getWindwoWidth()" top="15vh">
      <div class="mini-dialog-content dialog-content-bottom">
        <form-create v-model="fApi"
                     :rule="rule"
                     :option="option"
                     @searchs-click="searchChange"
                     @mounted="fcMounted"></form-create>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="this.loading" @click="onConfirm(true)">{{this.$t('message.okBtn')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import formCreate from '@form-create/element-ui'

  export default {
    name: 'AutoFromCreateDialog',
    components: {
      formCreate: formCreate.$form()
    },
    props: {
      // 0 大窗口，1中窗口，2，小窗口
      windowTypeProp: {
        type: Number,
        default: 2
      },
      titleProp: {
        type: String,
        default: 'message.prompt'
      },
      visibleProp: {
        type: Boolean,
        default: false
      },
      mackDataProp: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        loading: false,
        rule: this.mackDataProp,
        option: {
          global: {
            input: {
              props: {
                disabled: false
              }
            }
          },
          // 显示表单重置按钮
          resetBtn: false,
          submitBtn: false,
          mounted: function ($f) {
            console.log('form-create1 mounted', $f)
          }
        },
        fApi: {}
      }
    },
    methods: {
      getWindwoWidth () {
        if (this.windowTypeProp === 0) {
          return '80%'
        } else if (this.windowTypeProp === 1) {
          return '50%'
        } else {
          return '30%'
        }
      },
      onConfirm (flag) {
        this.loading = true
        this.fApi.validate((valid) => {
          console.log('valid =' + valid)
          if (valid) {
            // TODO 验证通过
            console.log('formD2=' + JSON.stringify(this.fApi.formData()))
            this.$emit('on-button-close', {'flag': true, 'data': this.fApi.formData()})
          } else {
            // TODO 验证未通过
            this.loading = false
          }
        })
        console.log(flag)
      },
      closeDialog () {
        this.loading = false
        this.$emit('on-button-close', {'flag': false})
      },
      change () {
        console.log(arguments)
      },
      change2 () {
        console.log('change2')
      },
      onSubmit () {
        console.log('onSubmit')
      },
      searchChange () {
        console.log('searchChange')
        this.$emit('on-button-search', this.fApi.formData())
      },
      fcMounted ($f) {
        console.log('form-create mounted', $f)
      },
      modifyLoading (flag) {
        this.loading = flag
      },
      modifyFeildData (dataList) {
        for (let dI of dataList) {
          for (let key in dI) {
            let type = dI['type']
            if (type === undefined || type === 0) {
              let item = dI[key]
              let t = this.fApi.el(key)
              t.innerHTML = item
            } else {
              // 待实现
            }
          }
        }
      }
    },
    mounted () {
      console.log(this.fApi)
    }
  }
</script>

<style scoped>
  .dialog-content-bottom {
    margin-bottom: -10px;
  }

  .form-create >>> .el-form-item {
    margin-bottom: 5px;
  }

  .form-create >>> .el-form-item--mini.el-form-item,.el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }

</style>
