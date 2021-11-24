import findNodeOne from './diffTree'
import formatDate from './formatDate'
import getUrlParam from './getUrlParams'
import logout from './logout'
import getGradientColor from './getGradientColor'
import debounce from './debounce'
import throttle from './throttle'
import Excel from './excel'
import flatObjectField from './flatObjectField'

export * from './type'

/**
 * 合并
 * @param {object} target - 目标对象
 * @param {object} source - 源对象
 * @description
 *  - 与 Object.assign 不同的是，merge 只拷贝源对象中与目标对象相同键名的值
 *  - 通常用来给表单回显数据（避免拷贝一些不需要的键值对）
 */
const merge = (target, source) => {
  for (const key in target) target[key] = source[key]
  return target
}

export {
  findNodeOne,
  formatDate,
  getUrlParam,
  logout,
  getGradientColor,
  debounce,
  throttle,
  Excel,
  flatObjectField,
  merge
}
