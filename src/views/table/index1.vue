<template>
  <div class="content-layout">
     <p>我是表格组件2</p>
  </div>
</template>
<script>
  export default {
    name: 'Table1',
    data () {
      return {
        testData: [{id: 0, name: 'lh'}, {id: 1, name: 'll'},{id: 2, name: 'hh'}]
      }
    },
    methods: {},
    created () {
      let map = new Map()
      console.log(map)
      for (let i = 0; i < this.testData.length; i++) {
        map.set(i,this.testData[i])
      }
      console.log(map)
      let arr1=[{id:1,name:'张三', age: 27},{id:2,name:'李四'}]
      let arr2=[{id:1,name:'张三'},{id:3,name:'王五'},{id:44,name:'王柳'},{id:45,name:'王琦'},]
      let add=arr2.filter(item=>arr1.some((ele)=>{ele.id===item.id}))
      console.log(add)
    }
  }
</script>
<style lang="scss" scoped>
</style>