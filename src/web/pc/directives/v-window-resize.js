import { debounce } from "@pc/utils"

/**
 * v-window-resize 指令
 * 统一监听 window resize 事件
 * @author Jeman
 */
const ctxName = '$$windowResize' // 上下文属性名，为防止与 DOM 属性名冲突，故越乱越好
let nodes = [] // 存放所有绑定该指令的 DOM
let nodeId = 0 // 每个 DOM 存放该 id 作为唯一标识，解绑指令时可以用来从 nodes 中删除该 DOM

window.addEventListener('resize', debounce(e => nodes.forEach(node => node[ctxName].handler(e))))

export default {
  name: 'window-resize',
  directive: {
    bind(el, binding) {
      const ctx = {
        id: nodeId++,
        handler: binding.value
      }

      el[ctxName] = ctx
      nodes.push(el)
    },
    unbind(el) {
      nodes = nodes.filter(node => node[ctxName].id !== el[ctxName].id)
      delete el[ctxName]
    }
  }
}
