/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'
import { User, BaseUser } from '@/domain/User'

export class BaseUsers {
  @observable list: User[]
}

type Request = Omit<BaseUsers, 'list'> & {
  list: BaseUser[]
}

export class Users extends BaseUsers {
  constructor(props?: Partial<Request>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update = ({ list, ...props }: Partial<Request>) => {
    Object.assign(this, props)

    if (list) {
      this.list = list.map(item => new User(item))
    }
  }
}
