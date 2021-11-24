/**
 * 节流
 * @author Jeman
 * @param {function} fn - 处理程序
 * @param {number} delay - 间隔，默认 300ms
 */
const throttle = (fn, delay = 300) => {
  let time = 0

  return function (...rest) {
    const now = Date.now()

    if (now - delay >= time) {
      time = now
      fn.apply(this, rest)
    }
  }
}

export default throttle
