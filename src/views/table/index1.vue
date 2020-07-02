<template>
  <div class="content-layout">
     
     <button v-copy="copyText">copy</button>
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
    directives: {
      autoFocus:{
      // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
      inserted(el){
        el.focus()
        console.log( 'inserted' );
      },
      // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
      bind(){
        console.log( 'bind' );
      },
      // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。
      // 指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 
      update(){
        console.log( 'update' );
      },
      // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
      componentUpdated(){
        console.log( 'componentUpdated' );
      },
      // 只调用一次，指令与元素解绑时调用。
      unbind(){
        console.log( 'unbind' );
      }
    }
    },
    data () {
      return {
         copyText: '要copy的内容', 
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
      total (arr) { // 数列求和
        let sum = arr.reduce((prev, cur) => {
        return prev + cur
        }, 0)
        return sum
      },
      getMyArray(nums) {
        nums.sort((a,b) => {
         return b - a
        })
        let myNums = JSON.parse(JSON.stringify(nums)) // 先深度拷贝一个数组
        let i = 1
        while (i < nums.length) { // 一次截取前面比较大的数字并且求和
          let nums1 = myNums.slice(0, i) // 截取前面大的数组
          console.log(nums1)
          let nums2 = myNums.slice(i) // 剩余的数组

          if (this.total(nums1) > this.total(nums2)) {
            return nums1
          } else {
            i++ // 继续截取数组
          }
        }
      },
   sortColors(nums) {
   let redCount = 0
   let whiteCount = 0
   let blueCount = 0
   for (let i=0; i<nums.length; i++) {
     if (nums[i] === 0) {
       redCount++ 
     } else if (nums[i] === 1) {
       whiteCount++
     } else {
        blueCount++
     }
   }
   let res = []
   let nums1 = new Array(redCount).fill(0)
   console.log(nums1)
   let nums2 = new Array(whiteCount).fill(1)
   console.log(nums2)
   let nums3 = new Array(blueCount).fill(2)
   console.log(nums3)
   let res1 = nums1.concat(nums2)
   console.log(res1)
   res = res1.concat(nums3)
   console.log(res)
   return res
},
       ...mapMutations('dirArrModule', {
      'configMutiCheckedArray': 'configMutiCheckedArray'}
    )
    },
    created () {
       // eslint-disable-next-line no-debugger
      debugger
      console.log(this.sortColors([2,0,2,1,1,0]))
      let arr = [1,2,3,4,5]
      arr.splice(0,2,1)
      console.log(arr)
      let intervals = [[2,3],[1,3],[8,10],[15,18]]
      intervals.sort((a,b) => {return a[1] - b[1]})
      console.log(intervals)
      console.log(this.total([6]))
      this.getMyArray([6])
      console.log(this.getMyArray([6]))
      for (let i = 0; i < this.responseData.length; i++) {
        if (i === 2) {
          this.responseData[i].checked = '2'
        } else {
          this.responseData[i].checked = '0'
        }
        this.actions.push([{name: '添加'}, {name: '修改'}, {name: '删除'}])
      }
      this.configMutiCheckedArray(JSON.parse(JSON.stringify(this.responseData)))
    },
    mounted () {
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
</script>
<style lang="scss" scoped>
</style>