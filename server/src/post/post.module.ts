/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'

import { PostService } from './post.service'

@Global()
@Module({
  providers: [PostService],
})
export class PostModule {}
