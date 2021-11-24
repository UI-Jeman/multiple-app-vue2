import vWindowResize from './v-window-resize'
import vTableInfiniteScroll from './v-table-infinite-scroll'

const directives = [
  vWindowResize,
  vTableInfiniteScroll
]

export default {
  install: Vue => directives.forEach(item => Vue.directive(item.name, item.directive))
}
