/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

// development config
const merge = require('webpack-merge')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    './index.tsx',
  ],
  devServer: {
    hot: true,
    overlay: true,
    proxy: {
      '/api': process.env.PROXY || 'http://localhost:3001',
    },
    host: '0.0.0.0',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ],
})
