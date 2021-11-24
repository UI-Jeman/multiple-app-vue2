<template>
  <div id="home">
    <my-header :tabList="tabList" :title="title" showHeaderBg showNotice></my-header>
    <router-swiper :tabList="tabList" />
  </div>
</template>
<script>
// 公共首页
export default {
  name: "Home",
  data() {
    return {
      title: '标题',
      tabList: [
        {
          title: "管理员",
          name: "Admin",
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
#home {
  min-height: 100vh;
}
</style>

