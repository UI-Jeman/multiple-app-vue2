const path = require('path')
const fs = require('fs')
const target = require('./target')

const appPath = target !== 'server' ? `./src/web/${target}` : `./src/server`

const appExternals = {
  pc: {
    'element-ui': 'ELEMENT'
  },
  app: {
    'vant': 'vant'
  }
}

const appCdn = {
  pc: {
    js: [
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/element-ui.common.min.js', // element-ui
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/locale/index.js', // element-ui 国际化文件
    ],
    css: [
      // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/theme-chalk/index.min.css'
    ]
  },
  app: {
    js: [
      'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js' // vant-ui
    ],
    css: []
  }
}

const gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim()
const ref = gitHEAD.split(': ')[1]
const gitInfo = {
  branch: gitHEAD.split('/').splice(-1),
  commitVersion: fs.readFileSync('.git/' + ref, 'utf-8').trim()
}

module.exports = {
  target,
  entry: appPath + '/main.js',
  outputDir: path.resolve('./dist/' + target),
  externals: {
    'vue': 'Vue',
    'axios': 'axios',
    'echarts': 'echarts',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    ...appExternals[target]
  },
  cdn: {
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js', // vue.js
      'https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js', // axios.js
      'https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js', // echarts.js
      'https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js', // vue-router.js
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js', // vuex.js
      ...appCdn[target].js
    ],
    css: [
      ...appCdn[target].css
    ]
  },
  ...gitInfo
}
