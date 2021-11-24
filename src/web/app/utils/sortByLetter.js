import pinyin from 'pinyin'


export default {
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('#'), // 大写字母集合

  /**
   * 按字母排序
   * @param {object[] | string} source - 数据源
   * @param {string} field - 如果数据源为对象，那么需要指定 field，既说明需要排序的是对象中的那个字段
   * @example { content: '内容', other: '其他内容' }，这里可以指定 field 为 content, 说明按照 content 进行排序
   */
  sort: function (source, field = 'name'){
    // 每个大写字母对应的数据集
    const letterMap = {}
    for (const letter of this.letters) letterMap[letter] = []

    source.forEach(item => {
      // 大写首字母
      const firstLetter = (pinyin(field ? item[field][0] : item[0], { style: pinyin.STYLE_FIRST_LETTER })[0] || [])[0].toUpperCase()
      if (this.letters.includes(firstLetter)) letterMap[firstLetter].push(item)
      else letterMap.un.push(item)
    })

    return letterMap
  }
}
