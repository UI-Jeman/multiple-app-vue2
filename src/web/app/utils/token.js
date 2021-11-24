/**
 * 用于操作 token
 * resolve 解析 token
 * get 获取 token
 * set 保存 token
 */
class Token {
  constructor (store) {
    this.store = store
    this.reg = /[?|&]sso_(?:app_)?id=([\w.]{0,})/
    
  }
  // 解析地址栏上的 token 并保存
  resolve () {
    const { location } = window
    const matched = this.reg.exec(location.href)
    if (matched) {
      this.set(matched[1])
      this.hide()
      window.localStorage.removeItem('user-detail')
      return matched[1]
    }
    return null
  }
  // 隐藏地址栏上的 token
  hide () {
    const { pathname, search, hash } = window.location
    const url = [pathname, search, hash]
    // 处理 token, 处理 url 末尾的 ? & #
      .map(str => str.replace(this.reg, '').replace(/(\?|&|#)$/, ''))
      .join('')
    const { title } = document
    // 替换当前浏览记录
    window.history.replaceState(null, title, url)
  }
  // 获取 token
  get (key = 'token') {
    return this.store.getItem(key)
  }
  /**
   *  保存 token
   * @param {String} [key=token] 键
   * @param {String} token 值
   */
  set (key, token) {
    if (token == null) {
      [key, token] = ['token', key]
    }
    this.store.setItem(key, token)
  }
}

const token = new Token(window.localStorage)

// 首次解析 token
token.resolve()

export default token
