/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql'
import { HttpException } from '@nestjs/common'
import { UserService } from './user.service'
import { User, UserInput, Todo } from '@/graphql'
import { todoes, users } from '@/data'

@Resolver('User')
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query()
  async user(@Args('id') id: string, @Context() context): Promise<User> {
    return users.find(item => item.id === id)
  }

  @Query()
  async userList(): Promise<User[]> {
    return users
  }

  @ResolveProperty()
  todoes(@Parent() user: User): Todo[] {
    const { id } = user

    return todoes.filter(item => item.user_id === user.id)
  }

  @Mutation()
  async updateUser(
    @Args('id') id: string,
    @Args('payload') payload: UserInput
  ): Promise<User> {
    const user = users.find(item => item.id === id)
    if (user) {
      Object.assign(user, payload)
      return user
    } else {
      throw new HttpException(`user ${id} is not found`, 400)
    }
  }
}
