<template>
  <aside :class="{ 'is-close': asideToggle }">
    <div class="logo-wrap">
      <router-link to="/">
        <img src="@pc/assets/logo.png" alt="幼儿园 Logo" title="幼儿园">
      </router-link>
    </div>
    <div class="menu-wrap">
      <el-menu
        class="app-menu"
        :default-active="activePath"
        :default-openeds="$route.matched.map(item => item.path)"
        :collapse="asideToggle"
        router>
        <template v-for="(menu, i) in $store.state.userMenus">
          <el-submenu v-if="menu.children && menu.children.length" :index="menu.path" :key="i">
            <template slot="title">
              <i :class="'iconfont ' + menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </template>
            <el-menu-item v-for="(subMenu, j) in menu.children" :index="menu.path + '/' + subMenu.path" :key="j">
              {{ subMenu.name }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.path" :key="i">
            <i :class="'iconfont ' + menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'my-aside',
    data() {
      return {
        activePath: ''
      }
    },
    computed: {
      ...mapState(['asideToggle'])
    },
    watch: {
      '$route': {
        handler(value) {
          const { matched, meta: { hidden }, path } = value
          this.activePath = matched.length && hidden ? matched[0].path : path
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 100%;
    background-color: $background-aside;

    &.is-close {
      .logo-wrap {
        width: 64px;
      }
    }
  }

  .logo-wrap {
    display: flex;
    flex-shrink: 0;
    width: $width-aside;
    padding: $height-nav 10px 10px;
    transition: width .4s;

    a {
      width: 100%;
      text-align: center;
    }

    img {
      width: 55%;
    }
  }

  .menu-wrap /deep/ {
    max-width: $width-aside; // 避免出现滚动条后宽度增加
    height: 100%;
    margin-top: 30px;
    overflow: hidden auto;
    

    .app-menu:not(.el-menu--collapse) {
      width: $width-aside;
    }

    .el-menu {
      border: none;
      background: transparent;

      .el-menu-item, .el-submenu__title, .el-submenu__icon-arrow {
        color: $color-white;

        &:hover, &:hover .el-submenu__icon-arrow  {
          color: rgba($color-primary, 70%);
        }

        &.is-active, &.is-active .el-submenu__icon-arrow  {
          color: $color-primary;
          background-color: $background-color-white;
        }
      }

      .iconfont {
        color: inherit;
        margin-right: 10px;
      }

      .el-submenu {
        .el-menu-item {
          padding-left: 45px!important;
        }
      }
    }
  }
</style>
