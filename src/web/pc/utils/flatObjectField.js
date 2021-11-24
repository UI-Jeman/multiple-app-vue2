/**
 * 扁平化对象所有层级指定属性
 * @param {object} origin - 源
 * @param {object} field - 指定属性映射 e.g. { children: 'children', prop: 'id' }
 * @param {function} fn - 回调，可用于按条件筛选，返回 true 则通过
 */
const flatObjectField = (origin, field = { children: 'children', prop: 'id' }, fn = () => true) => {
  const { children, prop } = field
  const results = []

  const each = (o) => {
    if (Array.isArray(o[children])) {
      o[children].forEach(item => {
        if (fn(item)) {
          results.push(item[prop])
        }

        if (item[children]) each(item)
      })
    }
  }

  each(origin)

  return results
}

export default flatObjectField
