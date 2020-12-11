/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

module.exports = {
  // tell babel to guess the type, like Webpack does, instead of assuming all files are modules
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        corejs: { version: 3, proposals: true },
        targets: '> 0.5%, not dead',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@ys/components',
        camel2DashComponentName: false,
        customName: name => {
          return `@ys/components/dist/${name}`
        },
      },
      '@ys/components',
    ],
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
}
