/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { users } from '@/domain'
import { userServer } from '@/server'

export class Env {
  init = async () => {
    const { list } = await userServer.getList()
    users.update({
      list,
    })
  }
}
