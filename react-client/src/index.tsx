/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import * as React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Modal } from '@ys/components'
import theme from './themes'
import App from '@/App'
import { StyledRoot } from './style'
import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
})

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
    <ApolloProvider client={client}>
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
