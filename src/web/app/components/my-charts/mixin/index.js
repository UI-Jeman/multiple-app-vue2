/**
 * echarts 图表组件的 mixin
 * 统一实例的名称为 instance
 * 统一管理实例的销毁及 resize
 */
 export default {
  data() {
    return {
      instance: null
    }
  },
  methods: {
    onResize() {
      const { instance } = this
      // 调用echarts的isDisposed方法返回一个布尔值判断当前echarts实例是否被释放
      if (instance && !instance.isDisposed()) instance.resize() //调用echarts的resize方法重绘图表
    }
  },
  destroyed() {
    this.instance.dispose() // 调用echarts的dispose方法销毁图表实例
    this.instance = null // 将instance重新置空
  }
}
