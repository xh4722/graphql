/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStore, Context } from '../store'
import { Updater } from './Updater'
import { Modal, Button } from '@ys/components'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/utils'

const StyledLayout = styled.div`
  display: flex;
  margin: 8px;

  > .right {
    margin-left: 10px;
  }
`

export const User = observer(function User() {
  const store = useStore()
  const { model } = store

  function updateUser() {
    Modal.show({
      title: '编辑用户',
      footer: null,
      content: ({ onCancel, onOk }) => (
        <ApolloProvider client={apolloClient}>
          <Context.Provider value={store}>
            <Updater onCancel={onCancel} onOk={onOk} />
          </Context.Provider>
        </ApolloProvider>
      ),
    })
  }

  return (
    <StyledLayout>
      <div>
        {model.firstName}-{model.lastName}
      </div>
      <div className='right'>
        <Button type='primary' onClick={updateUser}>
          编辑用户
        </Button>
      </div>
    </StyledLayout>
  )
})
