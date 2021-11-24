import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 带切换效果的视图容器
// const RouterSwiper = () =>
//   import('@app/components/bases/router-swiper')

/**
 * meta参数说明
 * @param {string} title - 页面标题
 * @param {number} index - 页面层级，用于判断路由跳转时左滑还是右滑
 * @param {string} role - 页面角色，用于判断公共路由当前所属角色
 */

// 公共路由
const routes = [
  {
    path: '/home',  // 首页
    component: () => import('@app/views/home/index.vue'),
    name: 'Home',
    redirect: '/home/overview',
    meta: { title: '首页', index: 2 },
    children: [{
      path: 'overview',
      meta: { title: '首页', index: 3 },
      component: () => import('@app/views/home/overview/index.vue'),
      name: 'Overview'
    }]
  }
]

// 管理员路由
const AdminRoutes = [
  {
    path: '/admin',  // 管理员
    component: () => import('@app/views/admin/index.vue'),
    name: 'Admin',
    redirect: '/admin/overview',
    meta: { title: '管理员', index: 0 },
    children: [{
      path: 'overview',
      meta: { title: '管理员', index: 1 },
      component: () => import('@app/views/admin/overview/index.vue'),
      name: 'Overview'
    }]
  }
]

// 用户路由
const UserRoutes = [
  {
    path: '/user',  // 用户
    component: () => import('@app/views/user/index.vue'),
    name: 'User',
    redirect: '/user/overview',
    meta: { title: '用户', index: 0 },
    children: [{
      path: 'overview',
      meta: { title: '用户', index: 1 },
      component: () => import('@app/views/user/overview/index.vue'),
      name: 'Overview'
    }]
  }
]


// 解决点击当前相同路由报错
const originalPush = VueRouter.prototype.push //获取原型对象上的push函数
VueRouter.prototype.push = function push(location) {//修改原型对象中的push方法
  return originalPush.call(this, location).catch(err => err)
}

export {
  routes,
  AdminRoutes,
  UserRoutes
}

