/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'

export class BaseUser {
  @observable id: string
  @observable firstName: string
  @observable lastName: string
  @observable age: number
}

export class User extends BaseUser {
  constructor(props?: Partial<BaseUser>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update = (props: Partial<BaseUser>) => {
    Object.assign(this, props)
  }
}
