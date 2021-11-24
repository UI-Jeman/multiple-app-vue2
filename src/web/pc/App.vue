<template>
  <div id="app" class="app">
    <my-aside></my-aside>
    <div>
      <header>
        <my-nav></my-nav>
      </header>
      <main>
        <router-view class="app-page"></router-view>
      </main>
      <footer></footer>
    </div>
  </div>
</template>

<script>
  import MyNav from '@pc/components/my-nav.vue'
  import MyAside from '@pc/components/my-aside.vue'
  export default {
    name: 'App',
    components: { MyNav, MyAside }
  }
</script>

<style lang="scss" scoped>
  .app {
    // display: flex;
    // flex-flow: row nowrap;
    height: 100%;

    > aside {
      float: left;
    }

    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
  }

  header {
    height: $height-nav;
    background-color: $background-aside;
  }

  main {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background: $background-color-base;
  }

  .app-page {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
  }
</style>
