/**
 * @author Jeman
 * @param {Date} _d 
 * @param {string} format 
 * @description 时间格式化
 *  - yyyy 展示完整年份
 *  - yy 展示年份后两位
 *  - MM 月份，不足两位填充 0
 *  - M 月份
 *  - dd 天数，不足两位填充 0
 *  - d 天数
 *  - HH 小时数，二十四小时制，不足两位填充 0
 *  - H 小时数，二十四小时制
 *  - hh 小时数，十二小时制，不足两位填充 0
 *  - h 小时数，十二小时制
 *  - mm 分钟数，不足两位填充 0
 *  - m 分钟数
 *  - ss 秒数，不足两位填充 0
 *  - s 秒数
 *  - w 周，简体中文
 */
export default function formatDate(_d, format = 'yyyy年MM月dd日 HH时mm分ss秒 周w') {
  const fillZero = val => (val + '').length < 2 ? '0' + val : val

  const year = _d.getFullYear()
  const month = _d.getMonth() + 1
  const date = _d.getDate()
  const hour = _d.getHours()
  const _hour = hour > 12 ? hour - 12 : hour
  const minute = _d.getMinutes()
  const second = _d.getSeconds()

  const obj = {
    yyyy: year,
    yy: (year + '').slice(-2),
    MM: fillZero(month),
    M: month,
    dd: fillZero(date),
    d: date,
    HH: fillZero(hour),
    H: hour,
    hh: fillZero(_hour),
    h: _hour,
    mm: fillZero(minute),
    m: minute,
    ss: fillZero(second),
    s: second,
    w: ['日', '一', '二', '三', '四', '五', '六'][_d.getDay()]
  }

  return format.replace(new RegExp(Object.keys(obj).join('|'), 'g'), str => obj[str] + '')
}
