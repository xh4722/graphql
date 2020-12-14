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
} from '@nestjs/graphql'
import { HttpException } from '@nestjs/common'
import { UserService } from './user.service'
import { User, UserInput, Todo } from '../graphql'

const userList = [
  {
    id: '1',
    firstName: 'user',
    lastName: 'test',
    age: 10,
  },
]

@Resolver('User')
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query('user')
  async user(@Args('id') id: string): Promise<User> {
    return userList.find(item => item.id === id)
  }

  @ResolveProperty()
  todoes(@Parent() user: User): Todo[] {
    const { id } = user

    return [
      {
        id: '1',
        name: '起床',
        done: false,
      },
    ]
  }

  @Mutation()
  async updateUser(
    @Args('id') id: string,
    @Args('payload') payload: UserInput
  ): Promise<User> {
    console.log(payload)
    const user = userList.find(item => item.id === id)
    if (user) {
      Object.assign(user, payload)
      return user
    } else {
      throw new HttpException(`user ${id} is not found`, 400)
    }
  }
}
