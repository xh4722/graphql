/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const IconfontWebpackPlugin = require('@ys/iconfont-webpack-plugin')
const WebpackBar = require('webpackbar')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const sourcePath = path.resolve(__dirname, '../src')
const { buildPath } = require('./defaults')

require('dotenv').config()

module.exports = {
  context: sourcePath,
  output: {
    path: buildPath,
    filename: 'scripts/[name].[hash:8].js',
    chunkFilename: 'scripts/[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: sourcePath,
        // resolve uglifyjs error in tapable
        exclude: /node_modules\/(?!tapable\/).*/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        include: sourcePath,
        exclude: /node_modules/,
        loader: [
          'thread-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              configFile: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: ['file-loader?name=img/[hash].[ext]'],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      // less
      // css
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#10398B',
                'link-color': '#10398B',
                'border-radius-base': '4px',
                'disabled-color': 'rgba(#10398B, 0.4)',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '@': sourcePath },
  },
  stats: 'errors-only',
  target: 'web',
  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: './assets/ys_favicon.ico',
      template: '../index.html',
    }),
    new IconfontWebpackPlugin({
      url: '//at.alicdn.com/t/font_1222147_htedetzxzrh.js',
      type: 'symbol',
    }),
  ].concat(
    // webpackbar will pollute stats.json
    process.env.STATS_MODE ? [] : [new WebpackBar()],
    process.env.ANALYZE_REPORT
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          }),
        ]
      : []
  ),
}
