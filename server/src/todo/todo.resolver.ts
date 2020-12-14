/* Copyright (C) 2016-present, Yuansuan.cn */

import { Query, Resolver, Args } from '@nestjs/graphql'
import { TodoService } from './todo.service'
import { Todo } from '../graphql'

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly service: TodoService) {}

  @Query('todo')
  async todo(@Args('id') id: string): Promise<Todo> {
    return {
      id,
      name: '起床',
      done: false,
    }
  }
}
