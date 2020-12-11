/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { GlobalContext, useGlobalStore } from '.'

export function GlobalProvider({ children }) {
  const store = useGlobalStore()

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  )
}
