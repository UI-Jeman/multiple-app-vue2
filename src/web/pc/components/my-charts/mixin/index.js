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
      !instance?.isDisposed() && instance.resize()
    }
  },
  beforeDestroy() {
    this.instance?.dispose()
    this.instance = null
  }
}
