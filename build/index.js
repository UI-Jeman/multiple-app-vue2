const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const target = process.argv[2]

const error = msg => {
  console.log(chalk.bgRed.rgb(255, 255, 255).bold(msg))
  return process.exitCode = 1
}

if (!target) return error(' -- 请指定应用名称 (e.g. npm run dev pc) -- \n')

try {
  fs.readdirSync(path.join(__dirname, `../src/web/${target}`))
  fs.writeFileSync(path.join(__dirname, '../config/target.js'), `module.exports = '${target}'`)
} catch (err) {
  console.log(err)
  if (err.code === 'ENOENT') error(' -- 请检查应用名称是否正确 -- \n')
  else console.log(err)
}
