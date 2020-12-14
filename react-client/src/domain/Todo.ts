/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'

class BaseTodo {
  @observable id: string
  @observable name: string
  @observable done: boolean
}

export type TodoRequest = BaseTodo

export class Todo extends BaseTodo {
  constructor(props?: Partial<TodoRequest>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update = (props: Partial<TodoRequest>) => {
    Object.assign(this, props)
  }
}
