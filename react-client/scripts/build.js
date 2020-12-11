/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

// 定义生产环境
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

const webpackConfig = require('../config/prod')
const { buildPath } = require('../config/defaults')
const printBuildError = require('./utils/printBuildError')

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(buildPath)

let compiler = webpack(webpackConfig)
compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red('Failed to compile.\n'))
    printBuildError(err)
    process.exit(1)
  }

  // throw compilation error
  const { warnings, errors } = stats.compilation
  if (errors.length > 0) {
    console.log(chalk.red('\nError in compilation:'))
    throw errors[0]
  }

  // console compilation warnings
  if (warnings.length > 0) {
    console.log(chalk.yellow(warnings[0].message))
  }

  const { assets } = stats.compilation
  const consoleData = []
  for (let key in assets) {
    const file = assets[key]
    consoleData.push({
      directory: path.dirname(key),
      filename: path.basename(key),
      fileType: path.extname(key),
      size: `${(file.size() / 1024 / 1024).toFixed(2)} MB`,
    })
  }

  if (console.table) {
    console.table(consoleData)
  } else if (consoleData.length > 0) {
    consoleData.forEach(data => {
      console.log(
        `directory: ${data.directory} filename: ${chalk.green(
          data.filename
        )} fileType: ${data.fileType} size: ${chalk.yellow(
          (data.size / 1024 / 1024).toFixed(2)
        )} MB`
      )
    })
  }
})
