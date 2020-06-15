<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    title: String,
    profit: Array
  },
  data () {
    return {
    }
  },
  methods: {
    processDateList () {
      let dateList = []
      for (let index = 0; index < this.profit.length; index++) {
        const element = this.profit[index]
        dateList.push(element.day)
      }
      return dateList
    },
    processMoneyList () {
      let moneyList = []
      let maxValue = 0
      for (let index = 0; index < this.profit.length; index++) {
        const element = this.profit[index]
        if (parseFloat(element.money_count) > maxValue) {
          maxValue = parseFloat(element.money_count) / 10
        }
        moneyList.push((parseFloat(element.money_count) / 10).toString())
      }
      moneyList.push('0')

      if (maxValue === 0) {
        moneyList.push('1')
      } else {
        moneyList.push((maxValue * 10).toString())
      }
      return moneyList
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.processDateList(),
      datasets: [
        {
          label: this.title,
          backgroundColor: '#3191ed',
          data: this.processMoneyList()
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
