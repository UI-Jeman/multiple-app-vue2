<template>
  <div v-window-resize="onResize" class="bar-chart" ref="barChart"></div>
</template>

<script>
  import { init } from 'echarts'
  import mixin from './mixin'

  export default {
    name: 'my-bar',
    mixins: [mixin],
    props: {
      value: { type: Object, default: () => {} },

      /**
       * 关于柱状图 x 轴的颜色、label 名称、用于取值的数据索引的配置
       * e.g. { label: '应到人数', color: '#8578da', dataIndex: 'test1' },
       */
      axisInfo: { type: Array, default: () => [] }
    },
    methods: {
      setChart(value) {
        if (!this.instance) this.instance = init(this.$refs.barChart)

        const { axisInfo } = this
        const labels = []
        const data = []

        axisInfo.forEach(item => {
          labels.push(item.label)
          data.push({ value: value[item.dataIndex], itemStyle: { color: item.color } })
        })


        this.instance.setOption({
          grid: {
            top: 40,
            bottom: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            interval: 0,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { color: '#333333' },
            data: labels
          },
          yAxis: {
            name: '（人）',
            nameTextStyle: { color: '#d7d9ec' },
            type: 'value',
            axisTick: { show: false },
            axisLabel: { color: '#d7d9ec' },
            splitLine: {
              lineStyle: { color: '#e7e9f3', type: 'dashed' }
            }
          },
          series: [{
            type: 'bar',
            label: { show: true, position: 'top', color: '#333' },
            barMaxWidth: '30',
            data
          }]
        })
      }
    },
    watch: {
      value(val) {
        this.setChart(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bar-chart {
    flex: 1;
    width: 100%;
    padding-bottom: 15px;
  }
</style>
