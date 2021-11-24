export default {
  // TOKEN
  isToken: /[?|&]sso_(?:app_)?id=([0-9a-zA-Z]{32})/,
  // 手机号
  isPhone: /^1[3-9]\d{9}$|^[0-9]\d{0,9}$/,
  // 邮箱
  isEmail: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  // 身份证
  isIDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 是否是IE或者Edge浏览器(regExp.isIE.test(window.navigator.userAgent))
  isIE: /Trident|Edge/,
  // 是否是在微信内打开(regExp.isWX.test(window.navigator.userAgent.toLowerCase()))
  isWX: /micromessenger/,
  // 是否是本地主机
  isLocalhost: /(localhost|0\.0\.0\.0|127\.0\.0\.1):/
}
