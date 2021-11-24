<template>
  <div class="my-empty">
    <i class="iconfont iconkongzhuangtai"></i>
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "MyEmpty",
  props: {
    content: { type: String, default: () => "暂无数据" }, // 内容
  },
};
</script>

<style lang="scss" scoped>
.my-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 120px 0px;
  color: $color-text-secondary;

  > i.iconfont {
    font-size: 200px;
    line-height: 200px;
    color: #ffcbcd;
  }

  > span {
    line-height: 60px;
    color: #aaa;
  }
}
</style>
