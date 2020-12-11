/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { observable, action } from 'mobx'

export class Env {
  @observable menuExpanded = true

  @action
  toggleMenuExpanded() {
    this.menuExpanded = !this.menuExpanded
  }
}
