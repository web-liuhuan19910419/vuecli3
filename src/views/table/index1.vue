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
  </div>
</template>
<script>
import mutiLangBaseGridComponent4 from '@/components/MutiLangBaseGridComponent4'
import {mapMutations} from 'vuex'
  export default {
    components: {mutiLangBaseGridComponent4},
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
        testData: [{id: 0, name: 'lh'}, {id: 1, name: 'll'},{id: 2, name: 'hh'}]
      }
    },
    methods: {
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
      onCheckIndexChange (rowIndex, itemStatus) {
        console.log(rowIndex, itemStatus)
        this.$store.state.dirArrModule.mutiCheckedArray[rowIndex].checked = itemStatus
        console.log(this.$store.state.dirArrModule.mutiCheckedArray)
      },
      onTableActions (index, rowIndex) {
        console.log(index, rowIndex)
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