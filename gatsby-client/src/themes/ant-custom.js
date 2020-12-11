/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

const theme = require('./index')

module.exports = {
  'primary-color': theme.primaryColor,
  'link-color': theme.primaryColor,
  'border-radius-base': '4px',
  'disabled-color': `rgba(${theme.primaryColor}, 0.4)`,
}
