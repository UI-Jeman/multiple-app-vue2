import { debounce } from "@pc/utils"

const scope = '$MYTableInfiniteScroll'

// 针对 el-table 的无限滚动
export default {
  name: 'table-infinite-scroll',
  directive: {
    bind(el, { value }) {
      const node = el.querySelector('.el-table__body-wrapper')
      const onScroll = debounce(function () {
        this.scrollHeight - this.clientHeight - this.scrollTop <= 40 && value()
      }, 200)

      el[scope] = { node, onScroll }
      node.addEventListener('scroll', onScroll, false)
    },
    unbind(el) {
      const { node, onScroll } = el[scope]

      node.removeEventListener('scroll', onScroll)
      delete el[scope]
    }
  }
}
