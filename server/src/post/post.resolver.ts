/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { ParseIntPipe } from '@nestjs/common'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from '../graphql.schema'

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('post')
  async post(@Args('id', ParseIntPipe) id: number): Promise<Post> {
    return {
      id,
      title: 'title',
      votes: 100,
    }
  }
}
