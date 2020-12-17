/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { observer, useLocalStore } from 'mobx-react-lite'
import { Modal } from '@ys/components'
import { Form, Input, Select } from 'antd'
import { users } from '@/domain'
import { todoServer } from '@/server'
import { useStore } from './store'

const StyledLayout = styled.div``

type Props = {
  id?: string
  onOk: () => void
  onCancel: () => void
}

export const Updator = observer(function Updator({
  id,
  onOk,
  onCancel,
}: Props) {
  const [form] = Form.useForm()
  const store = useStore()
  const state = useLocalStore(() => ({
    loading: false,
    setLoading(flag) {
      this.loading = flag
    },
    get todo() {
      return store.model.list.find(item => item.id === id)
    },
  }))

  useEffect(() => {
    if (state.todo) {
      form.setFieldsValue({
        name: state.todo.name,
        user_id: state.todo.user_id,
      })
    }
  }, [id])

  function submit() {
    form.submit()
  }

  async function onFinish(values) {
    try {
      state.setLoading(true)
      if (!state.todo) {
        await todoServer.create({
          name: values['name'],
          user_id: values['user_id'],
        })
        await store.fetch(true)
      } else {
        const todo = await todoServer.update(id, {
          name: values['name'],
          user_id: values['user_id'],
        })
        state.todo.update(todo)
      }
      onOk()
    } finally {
      state.setLoading(false)
    }
  }

  return (
    <StyledLayout>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label='名称' name='name'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='用户' name='user_id'>
          <Select>
            {users.list.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.firstName}-{item.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <Modal.Footer
        onOk={submit}
        okButtonProps={{ loading: state.loading }}
        onCancel={onCancel}
      />
    </StyledLayout>
  )
})
