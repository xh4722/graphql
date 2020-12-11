/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { createReducer, createAction } from '@/utils'
import produce from 'immer'

type Env = {
  menuExpanded: boolean
}

function init(): Env {
  return {
    menuExpanded: true,
  }
}

const reducer = createReducer(init(), handleAction => [
  handleAction(createAction('RESET')<Env>(), (_, { payload }) => payload),
  handleAction(
    createAction('TOGGLE_MENU')<Boolean>(),
    produce((draft, { payload }) => {
      draft.menuExpanded = payload
      return draft
    })
  ),
])

export default {
  reducer,
  init,
}
