/* Copyright (C) 2016-present, Yuansuan.cn */

import { apolloClient } from '@/utils'
import { gql } from '@apollo/client'

const TODO_LIST = gql`
  query todoList {
    list: todoList {
      id
      name
      done
    }
  }
`

const CREATE_TODO = gql`
  mutation createTodo($payload: CreateTodoInput!) {
    todo: createTodo(payload: $payload) {
      id
      name
      done
    }
  }
`

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $payload: CreateTodoInput!) {
    todo: updateTodo(payload: $payload) {
      name
      done
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`

export const todoServer = {
  async getList(
    params: { page_index: number; page_size: number },
    options?: {
      force?: boolean
    }
  ) {
    const {
      data: { list },
    } = await apolloClient.query({
      query: TODO_LIST,
      ...(options.force ? { fetchPolicy: 'network-only' } : undefined),
    })

    return {
      list,
      page_ctx: {
        total: list.length,
        index: 1,
        size: 10,
      },
    }
  },
  async create(payload: { name: string; user_id: string }) {
    const {
      data: { todo },
    } = await apolloClient.mutate({
      mutation: CREATE_TODO,
      variables: {
        payload,
      },
    })

    return todo
  },
  async update(id: string, payload: { name: string; user_id: string }) {
    const {
      data: { todo },
    } = await apolloClient.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id,
        payload,
      },
    })

    return todo
  },
  async delete(id: string) {
    return apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: {
        id,
      },
    })
  },
}
