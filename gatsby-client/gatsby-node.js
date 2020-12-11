/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  })
}
