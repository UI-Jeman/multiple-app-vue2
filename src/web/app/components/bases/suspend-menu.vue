<template>
  <div>
    <div
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      ref="floating"
      class="floating"
    >
      <span class="floating-home" v-if="menuList.length === 0"  @click="onClick">
        <i class="iconfont iconindex"></i>
       <div>首页</div>
      </span>
      <span v-else>
        <i class="iconfont iconxinzeng" @click="showMenu = !showMenu"></i>
      </span>
      <transition name="fade">
        <ul v-if="showMenu" class="supend-menu-list">
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :style="`background:${item.color}`"
            @click="toUrl(item.name)"
          >
            <i class="iconfont" :class="item.icon"></i>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuspendMenu",
  props: {
    menuList: { type: Array, default: () => [] }, // 传递菜单列表则点击弹出菜单不传递则默认为home键
  },
  data() {
    return {
      flags: false, //控制使用
      position: {
        x: 0,
        y: 0,
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      showMenu: false,
    };
  },
  methods: {
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.floating.offsetLeft;
      this.dy = this.$refs.floating.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;

        // 最小距离边缘0px
        // let width = window.innerWidth - this.$refs.floating.offsetWidth; //屏幕宽度减去自身控件宽度
        // let height = window.innerHeight - this.$refs.floating.offsetHeight; //屏幕高度减去自身控件高度
        // this.xPum < 0 && (this.xPum = 0);
        // this.yPum < 0 && (this.yPum = 0);

        // 最小距离边缘10px
        let width = window.innerWidth - this.$refs.floating.offsetWidth - 10; //屏幕宽度减去自身控件宽度
        let height = window.innerHeight - this.$refs.floating.offsetHeight - 10; //屏幕高度减去自身控件高度
        this.xPum < 10 && (this.xPum = 10);
        this.yPum < 10 && (this.yPum = 10);

        this.xPum > width && (this.xPum = width);
        this.yPum > height && (this.yPum = height);
        // if (this.xPum >= 0 && this.yPum >= 0 && this.xPum<= width &&this.yPum<= height) {
        this.$refs.floating.style.left = this.xPum + "px";
        this.$refs.floating.style.top = this.yPum + "px";
        // }
        //阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          function () {
            event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
    onClick() {
      this.$router.push({ path: "/" });
      // this.$emit("click");
    },
    toUrl(name) {
      // 菜单按钮跳转至对应菜单
      this.$router.push({ name: name });
    },
  },
};
</script>
<style lang="scss" scoped>
.floating {
  position: fixed; //定位
  right: 20px; //初始x轴位置
  bottom: 40px; //初始Y轴位置
  touch-action: none; //这个是重点如果不加新版谷歌会忽略掉touch方法
  text-align: center;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  // line-height: 96px;
  background: #5094f3;
  color: white;
  z-index: 999999;
  .floating-home {
    line-height: 40px;
    .iconfont {
      line-height: 48px;
      font-size: 40px;
    }
  }
  .supend-menu-list {
    position: absolute;
    bottom: 96px;
    li {
      text-align: center;
      width: 96px;
      height: 96px;
      margin: 10px 0;
      border-radius: 48px;
      line-height: 96px;
    }
  }
  @keyframes one {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .fade-enter-active {
    transform-origin: center bottom;
    animation: one 0.5s;
  }
  .fade-leave-active {
    transform-origin: center bottom;
    animation: one 0.5s reverse;
  }
}
</style>