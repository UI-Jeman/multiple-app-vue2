/**
 * 防抖
 * @author Jeman
 * @param {function} fn - 执行回调
 * @param {number} delay - 间隔（单位 ms），默认 200
 */
const debounce = (fn, delay = 200) => {
  let timer

  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

export default debounce
