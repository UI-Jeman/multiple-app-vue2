import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterView from '@pc/views/router-view.vue'

Vue.use(VueRouter)
export const staticRoutes = [
  {
    path: '/home',
    redirect: '/home/overview',
    name: 'Home',
    meta: { icon: 'iconindex', title: '首页' },
    component: RouterView,
    children: [
      {
        path: 'overview',
        name: 'Overview',
        meta: { title: '首页概览', hidden: true },
        component: () => import('@pc/views/home/overview.vue'),
      }
    ]
  },
  {
    path: '/setting',
    redirect: '/setting/dict-manage',
    name: 'Setting',
    meta: { icon: 'iconxitong', title: '系统设置' },
    component: RouterView,
    children: [
      {
        path: 'role-manage',
        name: 'RoleManage',
        meta: { title: '角色管理' },
        component: () => import('@pc/views/setting/role-manage/index.vue')
      }
    ]
  }
]

const formatMenu = (routes, filterHidden) => routes.map(route => {
  const { path, name: code, children, redirect, meta: { icon, title: name } } = route
  if (route.children) route.children = formatMenu(children.filter(item => (filterHidden ? !item.meta.hidden : true)))
  return { path, code, redirect, icon, name, children: route.children }
})

export const staticMenus = formatMenu(JSON.parse(JSON.stringify(staticRoutes)))

/**
 * 匹配当前用户已授权的路由
 * @param {array} menuNames 
 * @param {array} staticRoutes 
 */
export const matchRoute = (menuNames, staticRoutes) => {
  const results = []
  const each = (parent, routes) => {
    routes.forEach(route => {
      if (route.children) {
        const children = []
        each(children, route.children)
        route.children = children
        route.children?.length && (route.redirect = { name: children[0]?.name })
      }

      if (menuNames.includes(route.name)) parent.push(route)
    })
  }

  each(results, staticRoutes)

  return results
}


export const createUserMenus = routes => formatMenu(JSON.parse(JSON.stringify(routes)), true)

export const createUserRouter = routes => new VueRouter({ routes })


