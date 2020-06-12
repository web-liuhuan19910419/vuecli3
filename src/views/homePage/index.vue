<template>
  <div class="content-layout">
    <div style="margin-top: 10px; font-size: 20px; font-weight: 500;">欢迎来到我组件库首页</div>
    <div style="display: flex; justify-content: space-around; margin-top: 100px;" >
      <div class="charts">
        <div id="mycharts1" :style="{width: '400px', height: '400px'}"></div>
      </div>
      <div class="charts">
        <div id="mycharts2" :style="{width: '500px', height: '400px'}"></div>
      </div>
       <div class="charts">
        <div id="mycharts3" :style="{width: '500px', height: '400px'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HomePage',
    data () {
      return {
        options1: {
          title: {
            text: '柱状图',
            textStyle: {
            fontWeight: 'normal',
            color: '#ff0000'
            }
          },
          toolTip:{
            feature: {
            saveAsImage: {}
          }
          },
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['a', 'b', 'c', 'd', 'e', 'f']
          },
          yAxis: {
          },
          series: [
            { name: '销量', 
              type: 'bar', 
              data: [5, 10, 20, 30, 40,50],
              itemStyle: {
                normal: {
                  color: 'green'
                }
              }}
          ]
        },
        options2: {
           title: {
           text: '折线图'
          },
           tooltip: {
           trigger: 'axis',
           axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
           }
         },
          legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
            saveAsImage: {}
          }
          },
          grid: {
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
         ]
        },
        options3: {
           tooltip: {
           trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          grid: {
            top: '10%',
            containLabel: true
          },
          series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
           }
           ]
          }
        }
    },
    methods: {
      goTable () {
        this.$router.push({name: 'table1'})
      }
    },
    mounted () {
      let mycharts1 = this.$echarts.init(document.getElementById('mycharts1'))
      mycharts1.setOption(this.options1)
      let mycharts2 = this.$echarts.init(document.getElementById('mycharts2'))
      mycharts2.setOption(this.options2)
      let mycharts3 = this.$echarts.init(document.getElementById('mycharts3'))
      mycharts3.setOption(this.options3)
    }
  }
</script>
<style lang="scss">

</style>