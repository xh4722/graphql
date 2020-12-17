/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'
import { Item, BaseItem } from './Item'

export class BaseModel {
  @observable list: Item[] = []
  @observable page_ctx: {
    index: number
    size: number
    total: number
  } = {
    index: 1,
    size: 10,
    total: 0,
  }
}

type IRequest = Omit<BaseModel, 'list'> & {
  list: BaseItem[]
}

export class Model extends BaseModel {
  constructor(props?: Partial<IRequest>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update({ list, ...props }: Partial<IRequest>) {
    Object.assign(this, props)

    if (list) {
      this.list = list.map(item => new Item(item))
    }
  }
}
