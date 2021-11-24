import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router'
import store from './store';
import Filter from './filter'
import Directives from './directives'
import Components from './components'
import Vant from './installVant';  // 按需导入 Vant组件

import './styles/index.scss'; // 导入去除默认样式文件
import './utils/rem' // 导入 rem 单位适配配置
import 'lib-flexible/flexible' // 导入单位适配配置

import { token, helper, storage, formatDate, logout } from './utils'
import { // 导入公共路由，管理员路由，用户路由
  routes,
  AdminRoutes,
  UserRoutes
} from './router'


// import Vconsole from 'vconsole' // 导入移动端控制台调试工具 
// Vue.use(new Vconsole())

const logGitInfo = () => {
  const { VUE_APP_GIT_BRANCH, VUE_APP_COMMIT_VERSION } = process.env
  console.log(`%c当前分支：${VUE_APP_GIT_BRANCH}`, 'padding: 3px 10px; color: #fff; background: #67C23A; border-radius: 4px;')
  console.log(`%c当前提交：${VUE_APP_COMMIT_VERSION}`, 'padding: 5px 10px; color: #fff; background: #67C23A; border-radius: 4px;')
}

const createApp = () => {
  store.dispatch('getUserDetail')
    .then((res) => {
      switch (res.currentRole.code) { // 根据用户类型匹配可访问的路由
        case 1:
          UserRoutes.map((item) => {
            routes.push(item)
          })
          routes.push({
            path: '*',
            redirect: `${UserRoutes[0].redirect}`
          })
          break;
        case 0:
          AdminRoutes.map((item) => {
            routes.push(item)
          })
          routes.push({
            path: '*',
            redirect: `${AdminRoutes[0].redirect}`
          })
          break;
        default:
          logout()
      }
      let router = new Router({
        routes: routes
      })
      router.afterEach((to) => {
        document.title = to.meta.title
        window.scrollTo(0, 0);
      })
      Vue.config.productionTip = false
      Vue.prototype.$formatDate = formatDate
      Vue.prototype.$storage = storage
      Vue.prototype.$bus = new Vue()
      Vue.use(Vant)
      Vue.use(Filter)
      Vue.use(Components)
      Vue.use(Directives)
      renderApp(router)
    })
    .catch(err => {
      console.log(err)
      logout()
    })
}


// 实例化应用
function renderApp(router) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
  logGitInfo()
}

// 校验 token 是否存在
const TOKEN = token.get()
!TOKEN ? helper.jumpToLogin() : createApp()



