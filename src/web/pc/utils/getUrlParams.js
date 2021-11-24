/**
 * 获取 url 中的 query 参数
 * @author Jeman
 * @param {string} sUrl - 源 url
 * @param {string} sKey - query 对象的 key
 * @description 获取 url 中的 query 参数
 *  - 不提供 sKey 则获取所有 query - object 形式
 *  - 提供 key 则获取 query[key] - 多个同名参数则为数组，无匹配则返回空字符串
 */
export default function getUrlParam(sUrl, sKey) {
  sUrl = sUrl.replace(/.{0,}\?|#.{0,}/g, '').replace(/&/g, ' ')

  if (sKey) {
    const list = []

    sUrl.replace(
      new RegExp(`(${sKey})=(\\S{0,})`, 'g'),
      (p1, p2, p3) => list.push(p3)
    )
    return list.length ? (list.length === 1 ? list[0] : list) : ''
  } else {
    const obj = {}
    console.log(sUrl)
    sUrl.replace(
      /(\S{0,})=(\S{0,})/g,
      (p1, p2, p3) => obj[p2] = obj[p2] ? [].concat(obj[p2], p3) : p3
    )
    return obj
  }
}
