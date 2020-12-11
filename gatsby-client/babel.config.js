/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@ys/components',
        libraryDirectory: 'dist',
        camel2DashComponentName: false,
      },
      '@ys/components',
    ],
  ],
}
