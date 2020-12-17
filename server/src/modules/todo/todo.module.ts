/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'
import { TodoResolver } from './todo.resolver'
import { TodoService } from './todo.service'

@Global()
@Module({
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
