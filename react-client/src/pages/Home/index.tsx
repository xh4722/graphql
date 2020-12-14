/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { Mask } from '@ys/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Provider, useStore } from './store'
import { List } from './List'
import { User } from './User'

const StyledHome = styled.div`
  padding: 16px 20px;

  .body {
    font-size: 20px;
    font-weight: bolder;
  }
`

const BaseHome = observer(function BaseHome() {
  const store = useStore()
  const { loading } = store.result

  useEffect(() => {
    store.refresh()
  }, [])

  return (
    <StyledHome>
      {loading && <Mask.Spin />}
      <div className='body'>
        <User />
        <List />
      </div>
    </StyledHome>
  )
})

export default function HomePage() {
  return (
    <Provider>
      <BaseHome />
    </Provider>
  )
}
