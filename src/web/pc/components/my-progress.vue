<template>
  <div class="my-progress">
    <div class="my-progress_outer" :style="{ 'background-size': percent }">
      <div class="my-progress_inner" :style="{ width }" ref="inner">
        <span class="my-progress_label">
          <i class="iconfont iconxiaolian"></i>
        </span>
        <span
          :class="{ 'my-progress_tooltip': true }"
          :style="position"
          ref="tooltip">
          {{ value }}分，{{ description }}
        </span>
      </div>
    </div>
    <div class="my-progress_split">
      <!-- <i v-for="level in levels" :key="level.id">
        {{ level.percentage }}
      </i> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-progress',
    props: {
      total: { type: Number, default: 1 },
      value: { type: Number, default: 0 },
      description: String,
      levels: { type: Array, default: () => [] }
    },
    data() {
      return {
        timer: null,
        position: { left: '0px' }
      }
    },
    computed: {
      width() {
        return (100 - (this.value / this.total) * 100) + '%'
      },
      percent() {
        return 100 / this.levels.length + '%'
      }
    },
    methods: {
      setTooltipPosition() {
        this.timer && clearTimeout(this.timer)
        // 因为加了过渡效果，所以用定时器延迟一下计算（nextTick 无效）
        this.timer = setTimeout(() => {
          const { inner, tooltip } = this.$refs
          const { width: innerWidth } = inner.getBoundingClientRect()
          const { width: tooltipWidth } = tooltip.getBoundingClientRect()
          this.position = innerWidth - 10 > tooltipWidth
            ? { left: '0px' }
            : { right: '100%' }
          clearTimeout(this.timer)
          this.timer = null
        }, 400)
      }
    },
    mounted() {
      this.$watch('width', {
        handler: this.setTooltipPosition,
        immediate: true
      })
    }
  }
</script>

<style lang="scss" scoped>
  $height-progress: 8px;
  $color: #36d5af;

  .my-progress {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 50px 20px 10px;
  }

  .my-progress_outer {
    position: relative;
    width: 100%;
    height: $height-progress;
    border-radius: 20px;
    background: repeat linear-gradient(to right, $color calc(100% - 2px), #fff 2px);
    background-size: 25%;
  }

  .my-progress_inner {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 0;
    height: 100%;
    border-radius: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color:  #eef5fd;
    transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .my-progress_label {
    position: absolute;
    left: 0px;
    width: 28px;
    line-height: 27px;
    text-align: center;
    background-color: lighten($color, 15%);
    border-radius: 50%;
    transform: translate(-50%, calc(-50% + #{$height-progress / 2}));

    > i.iconfont {
      font-size: 16px;
    }
  }

  .my-progress_tooltip {
    position: absolute;
    bottom: calc(100% + 16px);
    white-space: nowrap;
    padding: 3px 14px;
    border-radius: 10px;
    color: #02d399;
    background: #cefff0;

    &::after {
      // content: '';
      position: absolute;
      top: 100%;
      width: 4px;
      height: 6px;
      background: inherit;
    }
  }

  .my-progress_split {
    display: flex;
    width: 100%;
    padding-top: 7px;

    > i {
      flex: 1;
      font-style: normal;
      transform: translateX(-10px);
    }
  }
</style>
