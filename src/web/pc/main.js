import "core-js/stable"
import "regenerator-runtime/runtime"

import Vue from 'vue'
import App from './App.vue'
import { staticRoutes, createUserMenus, createUserRouter, matchRoute } from './router/index'
import store from './store/index'
import './styles/main.scss'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Components from './components'
import Directives from './directives'
import Filter from './filter'
import { flatObjectField, getUrlParam, logout } from './utils/index'
import { getCurrentUserMenu } from "./api"

const logGitInfo = () => {
  const { VUE_APP_GIT_BRANCH, VUE_APP_COMMIT_VERSION } = process.env

  console.log(`%c当前分支：${VUE_APP_GIT_BRANCH}`, 'padding: 3px 10px; color: #fff; background: #67C23A; border-radius: 4px;')
  console.log(`%c当前提交：${VUE_APP_COMMIT_VERSION}`, 'padding: 5px 10px; color: #fff; background: #67C23A; border-radius: 4px;')
}

const createApp = async () => {
  await store.dispatch('getUserDetail')


  // 这里将获取用户授权菜单与本地静态菜单进行匹配
  const { data } = await getCurrentUserMenu()

  if (!data.length) {
    Message.warning('当前用户无授权菜单，请联系管理员授权。')
    return
  }
  const menuNames = flatObjectField({ children: data }, { children: 'children', prop: 'code' })
  const userRoutes = matchRoute(menuNames, staticRoutes)
  const userMenus = createUserMenus(userRoutes)
  const router = createUserRouter(userRoutes)

  store.commit('SET_USER_MENUS', userMenus)
  router.addRoutes([
    {
      path: '/*',
      name: 'NotFound',
      redirect: { name: userRoutes[0].name }
    }
  ])


  Vue.config.productionTip = false

  Vue.use(ElementUI)
  Vue.use(Components)
  Vue.use(Directives)
  Vue.use(Filter)

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')

  logGitInfo()
}

const queryToken = getUrlParam(location.href, 'sso_id')
if (queryToken) {
  sessionStorage.setItem('token', queryToken)
  location.replace(location.href.replace(/[?|&]?sso_id=[\w.]{0,}/, ''))
} else {
  const localToken = sessionStorage.getItem('token')

  localToken ? createApp() : logout()
}
