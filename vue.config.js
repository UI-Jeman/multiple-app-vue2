const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { target, entry, outputDir, cdn, externals, branch, commitVersion } = require('./config/index')
const px2rem = require('postcss-px2rem-exclude')
const postcss = px2rem({
  remUnit: 75,   //基准大小 baseSize，需要和rem.js中相同
  remPrecision: 2, // rem的小数点后位数
  exclude: /node_modules|folder_name/i
})

const isProd = process.env.NODE_ENV === 'production'

process.env.VUE_APP_GIT_BRANCH = branch
process.env.VUE_APP_COMMIT_VERSION = commitVersion

module.exports = {
  outputDir,

  publicPath: '.',

  productionSourceMap: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@${target}/styles/var.scss";`
      }, postcss: {
        plugins: target === 'app' ? [postcss] : []
      }
    }
  },
  configureWebpack: {
    entry,
    resolve: {
      alias: {
        '@pc': path.join(__dirname, 'src/web/pc'),
        '@app': path.join(__dirname, 'src/web/app')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '多应用项目基础模板',
        template: path.join(__dirname, 'public/index.html'),
        inject: 'body',
        ...isProd ? { js: cdn['js'], css: cdn['css'] } : {}
      })
    ],
    externals: isProd ? externals : {}
  },

  devServer: {
    disableHostCheck: true
  }
}
