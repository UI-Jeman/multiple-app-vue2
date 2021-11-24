import vWindowResize from './v-window-resize'

const directives = [
  vWindowResize
]

export default {
  install: Vue => directives.forEach(item => Vue.directive(item.name, item.directive))
}
