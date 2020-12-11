/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Logger } from '@nestjs/common'
import {
  initApp,
  config,
  FormatResponseInterceptor,
  ValidationPipe,
  loggerMiddleware,
} from '@ys/api'
import { AppModule } from './app.module'

declare const module: any

async function bootstrap() {
  const app = await initApp(AppModule, {
    prefix: config.app.prefix,
    middlewares: ({ traceIdMiddleware, metricsMiddleware }) => {
      const cookieParser = require('cookie-parser')

      // bodyParser should be set after proxyMiddleware to avoid invalid body format
      const bodyParser = require('body-parser')
      return [
        traceIdMiddleware,
        metricsMiddleware,
        cookieParser(),
        bodyParser.json({ limit: '10mb' }),
        bodyParser.urlencoded({
          limit: '10mb',
          extended: true,
        }),
        bodyParser(),
        loggerMiddleware,
      ]
    },
  })

  // app.useGlobalInterceptors(new FormatResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  const { port } = config.app
  await app.listen(port)
  Logger.log(`listen on port ${port}`)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
