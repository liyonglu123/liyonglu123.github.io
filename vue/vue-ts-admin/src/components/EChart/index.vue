<template>
  <div ref="chartWrapper" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import echarts from 'echarts'
@Component({ name: 'EChart' })
export default class EChart extends Vue {
  @Prop({
    type: String,
    default: '500px'
  })
  public width!: string
  @Prop({
    type: String,
    default: '500px'
  })
  public height!: string
  protected barChart
  protected mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.setOptions()
    })
  }
  protected initChart() {
    // this.barChart = echarts.init(document.getElementById('chart-wrapper'))
    this.barChart = echarts.init(this.$refs.chartWrapper as HTMLCanvasElement)
  }
  protected setOptions() {
    // 绘制图表
    this.barChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
  protected destoryed() {
    this.barChart = null
  }
}
</script>

<style lang="scss" scoped></style>
