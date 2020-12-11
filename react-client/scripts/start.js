/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

'use strict'

// env
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// handle unhandledRejection
process.on('unhandledRejection', err => {
  throw err
})

const http = require('http')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const path = require('path')
const fs = require('fs-extra')

const webpackConfig = require('../config/dev')
webpackConfig.devServer = webpackConfig.devServer || {}

function createApp({ port, host }) {
  const webpack = require('webpack')
  const compiler = webpack(webpackConfig)

  const openBrowser = require('./utils/openBrowser')

  const app = express()

  // dev-middleware
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'errors-only',
  })
  app.use(devMiddleware)
  // dev-middleware onComplete: open browser
  devMiddleware.waitUntilValid(() => {
    const pageUrl = `http://${host}:${port}`
    openBrowser(pageUrl)
  })
  // hot-middleware
  app.use(webpackHotMiddleware(compiler))

  // mock's priority is higher than proxy
  app.use(
    require('./middlewares/mock-filter-middleware')({
      config: {
        root: path.resolve(__dirname, '../config/mock/'),
        configFile: path.resolve(__dirname, '../config/mock/config.js'),
      },
    })
  )

  // proxy
  const proxy = require('http-proxy-middleware')
  const proxyConfig = webpackConfig.devServer.proxy || {}
  Object.keys(proxyConfig).forEach(key => {
    app.use(key, proxy(proxyConfig[key]))
  })

  return app
}

function runInUnusedPort({ port, host }, fn) {
  const net = require('net')
  const tester = net
    .createServer()
    .once('error', function(err) {
      if (err.code !== 'EADDRINUSE') {
        throw err
      }

      // try next port
      console.warn(`port:${port} is in use, check port:${port + 1}`)
      runInUnusedPort({ port: ++port, host }, fn)
    })
    .once('listening', function() {
      tester
        .once('close', function() {
          fn({ port, host })
        })
        .close()
    })
    .listen(port, host)
}

runInUnusedPort(
  {
    port: webpackConfig.devServer.port || 8080,
    host: webpackConfig.devServer.host || '127.0.0.1',
  },
  ({ port, host }) => {
    const server = http
      .createServer(createApp({ port, host }))
      .listen(port, host)
    server.on('listening', () => {
      console.log('Listening on port %s !', port)
    })
  }
)
