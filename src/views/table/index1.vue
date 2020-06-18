<template>
  <div class="content-layout">
     <p>我是表格组件1,支持勾选，排序，编辑等功能</p>
      <muti-lang-base-grid-component4
        :titles="gridTitles2"
        :title-widths="gridTitleWidths2"
        :data="processData2()"
        :isSupportMutiChoice=true
        :actions="actions"
        @on-index-change="onCheckIndexChange"
        @on-table-actions="onTableActions">
      </muti-lang-base-grid-component4>
      <auto-from-create-dialog id="autoFromCreateDialogRef" ref="autoFromCreateDialogRef" :title-prop="this.getDialogTitle()" :visible-prop.sync="this.comfirmDialogFlag" v-if="this.comfirmDialogFlag"
        :mack-data-prop="this.sureMockData"
        @on-button-close="closeReturnAction" 
        @on-button-search="searchAction">
      </auto-from-create-dialog>
  </div>
</template>
<script>
import mutiLangBaseGridComponent4 from '@/components/MutiLangBaseGridComponent4'
import AutoFromCreateDialog from './AutoFromCreateDialog'
import MockData from './mock/tableAddMock.js'
import {mapMutations} from 'vuex'
  export default {
    components: {mutiLangBaseGridComponent4, AutoFromCreateDialog},
    name: 'Table1',
    data () {
      return {
        responseData: [{name: 'liuhuan1',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan21',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan211',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan311111',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan21111',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan311',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan111',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan3113',age: '28', sex: 'boy', job: 'singer', taste: 'running'},
         {name: 'liuhuan3111',age: '28', sex: 'boy', job: 'singer', taste: 'running'}],
        gridTitles2: ['name', 'age', 'sex','job', 'interests'],
        gridTitleWidths2: ['20%',
        '10%',
        '10%',
        '10%',
        '30%'],
        actions: [],
        testData: [{id: 0, name: 'lh'}, {id: 1, name: 'll'},{id: 2, name: 'hh'}],
        sureMockData: [],
        comfirmDialogFlag: false,
        dialogCType: 1
      }
    },
    methods: {
      getDialogTitle () {
        if (this.dialogCType === 1) {
          return '增加'
        } else if (this.dialogCType === 0) {
          return '删除'
        } else if (this.dialogCType === 3) {
          return '修改'
        } else if (this.dialogCType === 2) {
          return '入库'
        } else {
          return '出库'
        }
      },
      closeReturnAction (data) {
        console.log(data)
        this.comfirmDialogFlag = !this.comfirmDialogFlag
      },
      processData2 () {
        let gridData = []
        for (let item of this.responseData) {
          let element = {
            name: item.name,
            age: item.age,
            sex: item.sex,
            job: item.job,
            taste: item.taste
          }
          gridData.push(element)
        }
        return gridData
      },
      searchAction (data) {
        console.log(data)
      },
      onCheckIndexChange (rowIndex, itemStatus) {
        console.log(rowIndex, itemStatus)
        this.$store.state.dirArrModule.mutiCheckedArray[rowIndex].checked = itemStatus
        console.log(this.$store.state.dirArrModule.mutiCheckedArray)
      },
      onTableActions (index, rowIndex) {
        console.log(index, rowIndex)
        this.sureMockData = MockData.mockData(this.responseData[rowIndex], 1)
        this.comfirmDialogFlag = !this.comfirmDialogFlag
        this.$nextTick(() => {console.log(this.$refs.autoFromCreateDialogRef)})
      },
       ...mapMutations('dirArrModule', {
      'configMutiCheckedArray': 'configMutiCheckedArray'}
    )
    },
    created () {
      for (let i = 0; i < this.responseData.length; i++) {
        if (i === 2) {
          this.responseData[i].checked = '2'
        } else {
          this.responseData[i].checked = '0'
        }
        this.actions.push([{name: '添加'}, {name: '修改'}, {name: '删除'}])
      }
      this.configMutiCheckedArray(JSON.parse(JSON.stringify(this.responseData)))
    }
  }
</script>
<style lang="scss" scoped>
</style>