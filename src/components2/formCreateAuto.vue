<template>
  <div class="form-crate-layout">
    <FormCreate :rule="rules" v-model="fApi" :options="options" @input-field1-change="change" @input-field2-blur="blur" @on-submit="onSubmit"></FormCreate>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        fApi: {}, // 绑定的值
        options: {
        },
        rules: [
          {
            type: 'input',
            title: 'col24',
            field: 'inputField0'
          },
          {
            type: 'input',
            title: 'col12',
            field: 'inputField1',
            col: {
              span: 12
            },
            emit: ['change']
          },
          {
            type: 'input',
            title: 'col12',
            field: 'inputField2',
            col: {
              span: 12
            },
            emit: ['blur']
          },
          {
            type: 'input',
            title: 'col8',
            field: 'col8_2',
            col: {
              span: 8
            }
          },
          {
            type: 'input',
            title: 'col8',
            field: 'col8_3',
            col: {
              span: 8
            }
          },
          {
            type: 'input',
            title: 'col8|offset8',
            field: 'col8_4',
            col: {
              span: 8,
              offset: 8
            }
          }
        ]
      }
    },
    methods: {
      change () {
        console.log(`change!![${this.fApi.getValue('inputField1')}]`)
      },
      blur () {
        console.log('blur!')
      },
      onSubmit (data) {
        console.log(data)
      }
    }
  }
</script>
