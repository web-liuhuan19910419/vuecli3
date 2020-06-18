import formCreate from '@form-create/element-ui'
let maker = formCreate.maker
let validateUpc = (rule, value, callback) => {
   value = value.trim()
   if (value === '') {
     callback(new Error('请输入UPC'))
   }
}
const mockData = {
   mockData (data, dialogCType) {
     console.log(data)
     let mock = [
     maker.hidden('dialogCType', (dialogCType !== undefined ? dialogCType : 1)),
    //    maker.hidden('soid', data.soid),
      maker.create('span', 'name', '姓名').domProps({
        innerHTML: data.name
      }).value(data.name),
      maker.create('span', 'age', '年龄').domProps({
        innerHTML: data.age
      }).value(data.age),
      maker.create('input', 'newName', '修改姓名').props({
        disable:false
      }).validate([{required: true, message: '请输入姓名', trigger: 'blur'},
      {validator: validateUpc, trigger: 'blur'}
      ]).on({
        change:function(){
          console.log('22222')
        }
      }).style({'width': '200px'}),
      maker.create('span', 'trim1', '').style({}),
      maker.create('span', 'trim2', '').style({})
     ]
     let tValue = (Number.parseInt(data.confirm_count) > 0 ? Number.parseInt(data.confirm_count) : 1)
     let inputNumberComponext = maker.number('修改年龄', 'newAge', tValue).props({
        precision: 0
      }).col({span: 24}).validate(
        [
          {require: true, type: 'number', min: tValue, max: Number.parseInt(data.claim_count - 1), message: '修改数量大于等于已确认数量小于接单数量'}
          ]
      )
  
      mock.push(inputNumberComponext)
    return mock
   }
}
export default mockData