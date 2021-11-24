<template>
  <div class="my-empty">
    <slot name="icon">
      <i class="iconfont iconkongzhuangtai"></i>
    </slot>
    <span>{{ content }}</span>
  </div>
</template>

<script>
  export default {
    name: 'my-empty',
    props: {
      content: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;
    color: $color-text-secondary;

    > i.iconfont {
      font-size: 100px;
      line-height: 100px;
    }

    > span {
      line-height: 60px;
    }
  }
</style>
