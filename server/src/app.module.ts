/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'
import { TodoModule } from './modules/todo/todo.module'

@Global()
@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: require('path').join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context(ctx) {
        return ctx
      },
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
