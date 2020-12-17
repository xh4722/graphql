/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'

export class BaseItem {
  @observable id: string
  @observable name: string
  @observable done: boolean
  @observable user_id: string
}

export class Item extends BaseItem {
  constructor(props?: Partial<BaseItem>) {
    super()

    if (props) {
      this.update(props)
    }
  }

  @action
  update(props: Partial<BaseItem>) {
    Object.assign(this, props)
  }
}
