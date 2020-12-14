/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Form, Input } from 'antd'
import { Modal } from '@ys/components'
import { useStore } from '../store'
import { useMutation, gql } from '@apollo/client'

const USER_UPDATER = gql`
  mutation UpdateUser($id: ID!, $payload: UserInput!) {
    updateUser(id: $id, payload: $payload) {
      firstName
      lastName
      age
    }
  }
`

const StyledLayout = styled.div``

type Props = {
  onOk: () => void
  onCancel: () => void
}

export const Updater = observer(function Updater({ onCancel, onOk }: Props) {
  const store = useStore()
  const { model } = store
  const [form] = Form.useForm()
  const [updateUser, { loading }] = useMutation(USER_UPDATER)

  useEffect(() => {
    form.setFieldsValue({
      firstName: model.firstName,
      lastName: model.lastName,
      age: model.age,
    })
  }, [])

  async function onFinish(values) {
    const { data } = await updateUser({
      variables: {
        id: model.id,
        payload: {
          firstName: values['firstName'],
          lastName: values['lastName'],
          age: +values['age'],
        },
      },
    })
    model.update(data.updateUser)
    onOk()
  }

  function submit() {
    form.submit()
  }

  return (
    <StyledLayout>
      <Form
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 6 }}
        form={form}
        onFinish={onFinish}>
        <Form.Item label='First Name' name='firstName' required>
          <Input />
        </Form.Item>
        <Form.Item label='Last Name' name='lastName' required>
          <Input />
        </Form.Item>
        <Form.Item label='Age' name='age' required>
          <Input />
        </Form.Item>
      </Form>
      <Modal.Footer
        onOk={submit}
        okButtonProps={{
          loading,
        }}
      />
    </StyledLayout>
  )
})
