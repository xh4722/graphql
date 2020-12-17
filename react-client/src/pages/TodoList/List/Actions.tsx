/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'
import { observer, useLocalStore, useAsObservableSource } from 'mobx-react-lite'
import { Button, Modal } from '@ys/components'
import { useStore } from '../store'
import { todoServer } from '@/server'

const StyledLayout = styled.div`
  > * {
    margin: 0 4px;
  }
`

type Props = {
  id: string
}

export const Actions = observer(function Actions({ id }: Props) {
  const props = useAsObservableSource({ id })
  const store = useStore()
  const { model } = store
  const { item } = useLocalStore(() => ({
    get item() {
      const { id } = props
      return model.list.find(item => item.id === id)
    },
  }))
  const { loading } = store

  function complete() {
    item.update({
      done: true,
    })
  }

  async function remove() {
    await Modal.showConfirm({
      title: '确认删除',
      content: `确认要删除${item.name}吗？`,
    })

    await todoServer.delete(id)
    store.fetch(true)
  }

  return (
    <StyledLayout>
      {!item.done && (
        <Button
          loading={loading}
          type='primary'
          size='small'
          onClick={complete}>
          完成
        </Button>
      )}
      <Button loading={loading} danger size='small' onClick={remove}>
        删除
      </Button>
    </StyledLayout>
  )
})
