module.exports = {
  iconfontUrl: '//at.alicdn.com/t/font_1364348_5zwjh87sut.js',
  webpack(config) {
    if (config.mode === 'development') {
      config.devServer = {
        hot: true,
        overlay: true,
        proxy: {
          '/api': process.env.PROXY || 'http://localhost:3001',
        },
        historyApiFallback: true,
      }
    }

    return config
  },
}
