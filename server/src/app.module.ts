/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './user/user.module'

@Global()
@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: require('path').join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
})
export class AppModule {}
