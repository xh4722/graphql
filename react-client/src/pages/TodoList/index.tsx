/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd'
import { observer } from 'mobx-react-lite'
import { useDidUpdate } from '@ys/fe-utils/hooks'
import { useStore, useModel, Context } from './store'
import { List } from './List'
import { Toolbar } from './Toolbar'

const StyledLayout = styled.div`
  padding: 10px;

  .main {
    padding: 14px 0;
    display: flex;
    flex-direction: column;

    .pagination {
      margin: 20px auto;
    }
  }
`

const ListPage = observer(function ListPage() {
  const store = useStore()
  const { model } = store

  useEffect(() => {
    store.fetch()
  }, [store.pageIndex, store.pageSize])

  // 如果当前分页大于1且当前页不存在数据，则跳转查询第一页数据
  useDidUpdate(() => {
    if (store.model.list.length === 0 && store.pageIndex > 1) {
      store.update({
        pageIndex: 1,
      })
    }
  }, [store.model.list.length])

  function onPageChange(index, size) {
    store.update({
      pageIndex: index,
      pageSize: size,
    })
  }

  const { total } = model.page_ctx

  return (
    <StyledLayout>
      <Toolbar />
      <div className='main'>
        <List />
        {total > 0 && (
          <Pagination
            className='pagination'
            showQuickJumper
            showSizeChanger
            pageSize={store.pageSize}
            current={store.pageIndex}
            total={total}
            onChange={onPageChange}
          />
        )}
      </div>
    </StyledLayout>
  )
})

export default function ListPageWithStore() {
  const model = useModel()

  return (
    <Context.Provider value={model}>
      <ListPage />
    </Context.Provider>
  )
}
