/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useStore } from './store'
import { Table, Button } from '@ys/components'

const StyledLayout = styled.div``

export const List = observer(function List() {
  const store = useStore()
  const state = useLocalStore(() => ({
    get dataSource() {
      return store.model.todoes.map(item => ({
        ...item,
        status: item.done ? '已完成' : '未完成',
      }))
    },
  }))

  function complete() {}

  return (
    <StyledLayout>
      <Table
        props={{
          data: state.dataSource,
          rowKey: 'id',
        }}
        columns={[
          {
            header: '名称',
            dataKey: 'name',
            props: {
              flexGrow: 1,
            },
          },
          {
            header: '状态',
            dataKey: 'status',
            props: {
              flexGrow: 1,
            },
          },
          {
            header: '操作',
            dataKey: 'id',
            props: {
              width: 100,
            },
            cell: {
              render({ rowData }) {
                const done = rowData['done']
                return (
                  <div>
                    {!done && (
                      <Button type='link' onClick={complete}>
                        完成
                      </Button>
                    )}
                  </div>
                )
              },
            },
          },
        ]}
      />
    </StyledLayout>
  )
})
