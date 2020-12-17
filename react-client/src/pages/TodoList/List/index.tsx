/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React, { useEffect } from 'react'
import { Table } from '@ys/components'
import styled from 'styled-components'
import { useLayoutRect } from '@ys/fe-utils/hooks'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useStore } from '../store'
import { Actions } from './Actions'

const StyledLayout = styled.div``

export const List = observer(function List() {
  const store = useStore()
  const [rect, ref, resize] = useLayoutRect()
  const { dataSource } = useLocalStore(() => ({
    get dataSource() {
      return store.model.list
        .filter(item => item.name.includes(store.queryKey))
        .map(item => ({
          ...item,
          done: item.done ? '已完成' : '未完成',
        }))
    },
  }))

  useEffect(() => {
    resize()
  }, [])

  return (
    <StyledLayout ref={ref}>
      <Table
        columns={[
          {
            header: '待办事项',
            dataKey: 'name',
          },
          {
            header: '是否完成',
            dataKey: 'done',
          },
          {
            header: '操作',
            cell: {
              props: {
                dataKey: 'id',
              },
              render({ rowData, dataKey }) {
                const id = rowData[dataKey]
                return <Actions id={id} />
              },
            },
          },
        ]}
        props={{
          width: rect.width,
          autoHeight: true,
          data: dataSource,
          loading: store.loading,
        }}
      />
    </StyledLayout>
  )
})
