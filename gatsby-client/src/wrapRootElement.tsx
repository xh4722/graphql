/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */
import React from 'react'
import { GlobalProvider } from './store/Provider'
import { ThemeProvider } from 'styled-components'
import theme from './themes'

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </GlobalProvider>
)
