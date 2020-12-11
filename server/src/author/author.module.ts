/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'

import { AuthorResolver } from './author.resolver'
import { AuthorService } from './author.service'

@Global()
@Module({
  providers: [AuthorService, AuthorResolver],
})
export class AuthorModule {}
