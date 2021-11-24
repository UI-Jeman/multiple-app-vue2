/**
 * 下载
 * @param {string} url - 文件 url
 * @param {string} name - 文件名
 */
let a
const download = (url, name) => {
  a || (a = document.createElement('a'))
  a.href = url
  a.download = name
  a.click()
}

export default class Excel {
  static type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  /**
   * 初始化
   * @param {object} options
   * @param {array} options.columns - 列，除增加 transform 方法外，其他类型同 ant-design-vue 表格组件的 columns 属性，自己去查文档
   * @param {array} options.data
   * @param {function | undefined} option.spanMethod - 合并行的回调，同 element-ui 表格组件的 span-method 属性，自己去查文档
   * @param {boolean | undefined} option.appendToBody - 是否需要渲染表格，将会追加到 body 下，调试时可能用到
   * @param {object | undefined} option.headStyle - 表头样式，没有进行小驼峰转换，所以需要注意键为横杠格式，只字体颜色、大小及背景有效
   * @param {object | undefined} option.bodyStyle - 表格主体样式，同上
   */
  constructor(options) {
    const table = document.createElement('table')
    const { appendToBody } = options

    Object.assign(this, { data: [], columns: [], spanMethod: () => ({ rowspan: 1, colspan: 1 }) }, options)

    table.border = 1
    table.style.fontSize = '15px'
    table.innerHTML = this.initHead() + this.initBody()

    appendToBody && document.body.appendChild(table)

    this.table = table
  }

  initHead() {
    const { columns, headStyle = {} } = this
    let thead = '<thead>'
    let tr = '<tr>'
    let th = ''
    let inlineCss = ''

    for (const key in headStyle) inlineCss += `${ key }: ${ headStyle[key] }; `

    columns.forEach(item => {
      const { align, width, title } = item

      th += `
        <th align="${ align || 'center' }" width="${ width || 'auto' }" style="${ inlineCss }">
          ${ title }
        </th>
      `
    })

    tr += th + '</tr>'
    thead += tr + '</thead>'

    return thead
  }

  initBody() {
    const { columns, data, spanMethod, bodyStyle } = this
    const defaultSpan = { rowspan: 1, colspan: 1 }
    let inlineCss = ''
    let tbody = '<tbody>'

    for (const key in bodyStyle) inlineCss += `${ key }: ${ bodyStyle[key] }; `

    data.forEach((row, rowIndex) => {
      let tr = '<tr>'

      columns.forEach((column, columnIndex) => {
        const { align, width, dataIndex, transform } = column
        const span = spanMethod({ row, rowIndex, column, columnIndex }) || defaultSpan
        const { colspan } = span
        let { rowspan } = span
        let td = ''

        if (colspan && rowspan) {
          if (!data[rowIndex + 1]) rowspan = 1

          td = `
            <td align="${ align || 'center' }" width="${ width || 'auto' }" colspan="${ colspan }" rowspan="${ rowspan }" style="${ inlineCss }">
              ${ transform ? transform(row[dataIndex], row) : row[dataIndex] || '' }
            </td>
          `
        }

        tr += td
      })

      tr += '</tr>'
      tbody += tr
    })
    
    tbody += '</tbody>'

    return tbody
  }

  /**
   * 导出表格
   * @param {string} name - 导出的文件名
   */
  export(name) {
    const blob = new Blob([this.table.outerHTML], { type: Excel.type })
    const url = URL.createObjectURL(blob)

    download(url, name)
    URL.revokeObjectURL(url)
  }
}
