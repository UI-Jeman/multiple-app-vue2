<template>
  <van-tabs
    :type="type"
    v-model="active"
    @click="onClick"
    @change="onChange"
    :swipeable="swipeable"
    :animated="animated"
    :border="false"
    :color="color"
    :line-width="`${showBorder ? '' : 0}`"
    :background="`${type === 'card' ? '#3da2fd' : 'none'}`"
    class="my-tabs"
    :class="`${type === 'card' ? 'my-tabs-card' : 'my-tabs-line'}`"
  >
    <div
      slot="nav-right"
      v-if="tabWidth !== ''"
      :style="`width:calc(100% - ${tabWidth}px)`"
    ></div>
    <van-tab
      v-for="(item, index) in list"
      :key="index"
      :title="item.title"
      :to="{name: item.name}"
    >
      <slot></slot>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  props: {
    value: { type: Number, default: () => 0 }, // 绑定值
    color: { type: String, default: () => "" }, // 主色调
    tabWidth: { type: String, default: () => "" }, // 导航宽度
    type: { type: String, default: () => "card" }, // 类型， card胶囊按钮/line线性滑块
    showBorder: { type: Boolean, default: false }, // 是否显示底部滑块
    swipeable: { type: Boolean, default: false }, // 是否支持滑动切换
    animated: { type: Boolean, default: true }, // 是否启用动画
    list: { type: Array, default: () => [] }, // tab列表
  },
  name: "MyTabs",
  data() {
    return {
      active: 0,
    };
  },
  created() {
    this.list.map((item, index) => {
      if (!item.name) {
        this.active = this.value;
      } else if (item.name === this.$route.name) {
        this.active = index;
      }
    });
  },
  watch: {
    $route(to) {
      this.list.map((item, index) => {
        if (item.name === to.name) {
          this.active = index;
        }
      });
    },
  },
  methods: {
    onClick(val) {
      this.$emit("input", val);
    },
    onChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="scss">
.my-tabs-card {
  .van-tabs__nav--card {
    margin: 0;
    border-radius: 30px;
    overflow: hidden;
    border: none;
    background: #3da2fd;
  }
  .van-tabs__nav {
    // background: $color-primary;
    .van-tab__text {
      color: #fff;
    }
  }
}
.my-tabs-line {
  .van-tabs__wrap {
    height: 80px;
    // width: 240px;
    .van-tab--active {
      .van-tab__text--ellipsis {
        font-weight: bold;
      }
    }
    .van-tab__text--ellipsis {
      height: 80px;
      line-height: 80px;
    }
    .van-tabs__line {
      width: 40px;
      border-radius: 3px;
      background-color: #333;
    }
  }
}
</style>

