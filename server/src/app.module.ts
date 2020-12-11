/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Module, Global } from '@nestjs/common'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthorModule } from './author/author.module'

@Global()
@Module({
  controllers: [AppController],
  imports: [
    AuthorModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: require('path').join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
  ],
})
export class AppModule {}
