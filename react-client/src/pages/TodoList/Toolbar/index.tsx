/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'
import { Input, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore, Context } from '../store'
import debounce from 'lodash/debounce'
import { Modal, Button } from '@ys/components'
import { Updator } from '../Updator'

const StyledLayout = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColorBase};
  display: flex;

  .left {
    display: flex;

    > div {
      margin-right: 10px;
    }
  }

  > .right {
    margin-left: auto;
  }
`

export const Toolbar = observer(function Toolbar() {
  const store = useStore()
  const [form] = Form.useForm()

  function submit() {
    form.submit()
  }
  const debounceSubmit = debounce(() => {
    submit()
  }, 300)

  function onFinish(values) {
    store.update({
      queryKey: values['queryKey'],
      pageIndex: 1,
    })
  }

  function create() {
    Modal.show({
      title: '新建 todo',
      footer: null,
      content: ({ onCancel, onOk }) => (
        <Context.Provider value={store}>
          <Updator onCancel={onCancel} onOk={onOk} />
        </Context.Provider>
      ),
    })
  }

  return (
    <StyledLayout>
      <div className='left'>
        <Button type='primary' onClick={create}>
          新建
        </Button>
      </div>
      <div className='right'>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label='名称' name='queryKey'>
            <Input
              allowClear
              disabled={store.loading}
              onChange={debounceSubmit}
              placeholder='请输入名称'
            />
          </Form.Item>
        </Form>
      </div>
    </StyledLayout>
  )
})
