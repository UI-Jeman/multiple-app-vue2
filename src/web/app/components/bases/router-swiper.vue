<template>
  <transition :name="transitionName" :duration="{ enter: 500, leave:0 }">
      <router-view></router-view>
  </transition>
</template>

<script>
export default {
  props: {
    tabList: { type: Array, default: () => [] }, // tab列表 根据tab下标对比当前路由name判断左滑还是右滑
  },
  name: "RouterSwiper",
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (this.tabList.length > 0) {
        let toIndex, fromIndex;
        this.tabList.map((item, index) => {
          if (item.name === to.name) {
            toIndex = index;
          }
          if (item.name === from.name) {
            fromIndex = index;
          }
        });
        this.transitionName =
          toIndex > fromIndex ? "slide-left" : "slide-right";
      } else {
        this.transitionName =
          from.meta.index > to.meta.index ? "slide-right" : "slide-left";
      }
    },
  },
};
</script>
<style lang="scss">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
