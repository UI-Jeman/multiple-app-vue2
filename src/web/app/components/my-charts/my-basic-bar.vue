<template>
  <div class="my-basic-bar">
    <div v-window-resize="onResize" ref="MyBasicBar"></div>
  </div>
</template>

<script>
import { init } from "echarts";
import mixin from "./mixin";
import { lightenDarkenColor } from "@app/utils";
export default {
  props: {
    // name（今日/昨日）显示位置, end在上方，start在下方
    nameLocation: { type: String, default: () => "end" },
    name: { type: String, default: () => "" }, //图标名称（今日/昨日）
    dataList: { type: Array, default: () => [] }, // 数据列表
  },
  name: "MyBasicBar",
  mixins: [mixin],
  mounted() {
    this.$watch("dataList", {
      handler(val) {
        this.initChart(val);
      },
      immediate: true,
      deep: true,
    });
  },
  methods: {
    initChart(dataList = []) {
      // 基于准备好的dom，初始化echarts实例
      if (!this.instance) {
        const el = this.$refs.MyBasicBar;
        this.instance = init(el);
      }
      dataList = dataList.map((item) => item).reverse();
      let option = {
        grid: {
          left: "0",
          right: "0",
          bottom: this.name !== "" ? "5%" : "0",
          top: "12%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#d9ddec",
            },
            show: this.name === "",
          },
          type: "category",
          data: dataList.map((item) => item.label),
          position: "right",
          name: this.name,
          nameLocation: this.nameLocation,
          nameTextStyle: {
            color: "#ced3e7",
            padding: [0, 0, 0, 40],
            verticalAlign: "top",
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            animation: false,
            data: dataList.map((item) => item.value),
            label: {
              show: true,
              position: "insideRight",
              verticalAlign: "middle",
              valueAnimation: true,
              color: "#fff",
            },
            itemStyle: {
              borderRadius: [0, 4, 4, 0],
              color: (params) => {
                var idx = params.dataIndex;
                return {
                  type: "linear",
                  x: 1,
                  x2: 0,
                  y: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: lightenDarkenColor(dataList[idx].color, 50),
                    },
                    { offset: 1, color: dataList[idx].color },
                  ],
                };
              },
            },
          },
        ],
      };

      this.instance.setOption(option);
    },
  },
};
</script>
<style lang="scss">
.my-basic-bar {
  div {
    width: 100%;
    height: 360px;
    margin: 0 auto;
  }
}
</style>