/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'
import { Todo, TodoRequest } from './Todo'

class BaseUser {
  @observable id: string
  @observable firstName: string
  @observable lastName: string
  @observable age: number
  @observable todoes: Todo[] = []
}

export type UserRequest = Omit<BaseUser, 'todoes'> & {
  todoes: TodoRequest[]
}

export class User extends BaseUser {
  constructor(props?: Partial<UserRequest>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update = ({ todoes, ...props }: Partial<UserRequest>) => {
    Object.assign(this, props)

    if (todoes) {
      this.todoes = todoes.map(item => new Todo(item))
    }
  }
}
