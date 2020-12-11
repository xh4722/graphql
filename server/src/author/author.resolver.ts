/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { ParseIntPipe } from '@nestjs/common'
import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql'
import { AuthorService } from './author.service'
import { Author, Post } from '../graphql.schema'

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query('author')
  async author(@Args('id', ParseIntPipe) id: number): Promise<Author> {
    return {
      id,
      firstName: 'author',
      lastName: 'test',
    }
  }

  @ResolveProperty()
  posts(@Parent() author: Author): Post[] {
    const { id } = author
    return [
      {
        id: 1,
        title: 'title',
        votes: 100,
      },
    ]
  }
}
