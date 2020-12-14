/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import * as React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import { Modal } from '@ys/components'
import { theme } from '@ys/utils/constant'
import App from '@/App'
import { StyledRoot } from './style'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/utils'

// config the theme of Modal
Modal.theme = theme

// ignore trivial rejection
window.addEventListener('unhandledrejection', event => {
  if (!event.reason) {
    event.preventDefault()
  }
})

const renderApp = () =>
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <ConfigProvider locale={zhCN}>
          <StyledRoot id='styledRoot'>
            <App />
          </StyledRoot>
        </ConfigProvider>
      </ThemeProvider>
    </ApolloProvider>,
    document.querySelector('#root')
  )

renderApp()
