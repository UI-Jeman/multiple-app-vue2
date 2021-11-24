<template>
  <div id="User">
    <my-header :tabList="tabList" :title="title" showHeaderBg showNotice></my-header>
    <router-swiper :tabList="tabList" />
  </div>
</template>
<script>
// 公共首页
export default {
  name: "User",
  data() {
    return {
      title: '标题',
      tabList: [
        {
          title: "用户",
          name: "User",
        },
        {
          title: "首页",
          name: "Home",
        },
      ],
    };
  }
};
</script>
<style lang="scss">
#User {
  min-height: 100vh;
}
</style>

