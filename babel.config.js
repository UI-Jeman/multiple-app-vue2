module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          ie: "11"
        },
        useBuiltIns: "entry",
        corjs: {
          version: 3,
          proposals: true
        }
      }
    ]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
