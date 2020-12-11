/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

// production config
const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  devtool: 'hidden-source-map',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          ecma: 6,
          cache: true,
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(s?c|le)ss$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: {
      name: entrypoint => `manifest.${entrypoint.name}`,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      append: false,
    }),
    new MiniCssExtractPlugin({
      // don't use chunkhash
      // The code points to the CSS through JavaScript bringing it to the same entry.
      // That means if the application code or CSS changed,it would invalidate both.
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
      },
    }),
  ],
})
