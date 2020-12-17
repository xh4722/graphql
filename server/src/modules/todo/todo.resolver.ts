/* Copyright (C) 2016-present, Yuansuan.cn */

import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { HttpException } from '@nestjs/common'
import { TodoService } from './todo.service'
import { Todo, UpdateTodoInput, CreateTodoInput } from '@/graphql'
import { todoes } from '@/data'
import * as uuid from 'uuid'

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly service: TodoService) {}

  @Query()
  async todo(@Args('id') id: string): Promise<Todo> {
    return todoes.find(item => item.id === id)
  }

  @Query()
  async todoList(): Promise<Todo[]> {
    return todoes
  }

  @Mutation()
  async createTodo(@Args('payload') payload: CreateTodoInput): Promise<Todo> {
    const todo = {
      id: uuid.v4(),
      ...payload,
      done: payload.done || false,
    }
    todoes.push(todo)

    return todo
  }

  @Mutation()
  async updateTodo(
    @Args('id') id: string,
    @Args('payload') payload: UpdateTodoInput
  ): Promise<Todo> {
    const todo = todoes.find(item => item.id === id)
    if (todo) {
      Object.assign(todo, payload)
      return todo
    } else {
      throw new HttpException(`user ${id} is not found`, 400)
    }
  }

  @Mutation()
  async deleteTodo(@Args('id') id: string) {
    const index = todoes.findIndex(item => item.id === id)
    if (index > -1) {
      todoes.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}
