export default {
  // 存储localStorage
  set: (name, content = '') => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  // 获取localStorage
  get: name => {
    if (!name) return
    let content = window.localStorage.getItem(name) ? window.localStorage.getItem(name) : ''
    try {
      if (typeof JSON.parse(content) === 'number') {
        return content
      } else {
        return JSON.parse(content)
      }
    } catch (error) {
      return content
    }
  },
  // 删除localStorage
  remove: name => {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
