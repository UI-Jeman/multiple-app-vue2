const LOGIN_ADRESS = "loginPage" // TODO:tochange

import storage from './storage'

// 辅助业务逻辑

const helper = {
  /**
   * 跳转到登录页
   */
  jumpToLogin() {
    storage.remove('token')
    storage.remove('user-detail')
    window.location = `${LOGIN_ADRESS}?redirect_url=${encodeURIComponent(location.href)}`
    throw SyntaxError('阻止跳转')
    // return false
  },
}

export default helper
