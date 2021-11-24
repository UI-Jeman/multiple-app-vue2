import MyBasicBar from './my-charts/my-basic-bar'

import MyEmpty from './bases/my-empty'
import MyHeader from './bases/my-header'
import MyTabs from './bases/my-tabs'
import RouterSwiper from './bases/router-swiper'
import SuspendMenu from './bases/suspend-menu'


const components = [
  MyBasicBar,

  MyEmpty,
  MyHeader,
  MyTabs,
  RouterSwiper,
  SuspendMenu,
]

export default {
  install(Vue) {
    components.forEach(component => Vue.component(component.name, component))
  }
}
