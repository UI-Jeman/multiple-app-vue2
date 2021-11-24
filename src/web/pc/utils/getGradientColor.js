/**
 * 获取渐变色
 * @author Jeman
 * @param {string} startHexColor - 起始位置的颜色（十六进制）
 * @param {string} endHexColor - 结束位置的颜色（十六进制）
 * @param {number} range - 渐变范围（正整数，值越小，endHexColor 越接近 startHexColor）
 * @returns {number} hexList - 所有十六进制组成的数组
 */
const getGradientColor = (startHexColor, endHexColor, range = 100) => {
  const computeColor = hexColor => {
    const rgbColor = hexColor.slice(1).replace(/\w\w/g, val => parseInt(val, 16) + ' ').trim()
    return rgbColor
  }
  const maxRange = 100
  const startRgb = computeColor(startHexColor).split(' ')
  const endRgb = computeColor(endHexColor).split(' ')
  const hexList = []
  let num = 0

  for (let i = 0; i < range; i++) {
    let hex = ''

    endRgb.forEach((end, index) => {
      let start = Number(startRgb[index])
      end = Number(end)

      if (end > start) {
        hex += (start + num > 255 ? 255 : (start + num)).toString(16)
      } else if (end < start) {
        hex += (start - num < 0 ? 0 : (start - num)).toString(16)
      } else {
        hex += start.toString(16)
      }

      if (hex.length === 1) hex += hex
    })

    hexList.push('#' + hex)
    num += Math.floor(maxRange / range)
  }

  return hexList
}

export default getGradientColor
