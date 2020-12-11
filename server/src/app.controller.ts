/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Controller, Get } from '@nestjs/common'

@Controller('app')
export class AppController {
  @Get('/')
  hello() {
    return 'helloworld'
  }
}
