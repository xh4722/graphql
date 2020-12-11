/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { createActionCreator } from 'deox'

export * from './hooks'

export function createAction<K extends string>(name: K) {
  return function _createAction<T = void, M = void>() {
    return createActionCreator(name, resolve => (payload: T, meta?: M) =>
      resolve(payload, meta)
    )
  }
}
export { createReducer } from 'deox'
