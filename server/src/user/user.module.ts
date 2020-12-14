/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Global()
@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
