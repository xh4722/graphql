/* Copyright (C) 2016-present, Yuansuan.cn */

import { useEffect } from 'react'
import { createStore } from '@ys/utils/hooks'
import { useLazyQuery, gql, ApolloQueryResult } from '@apollo/client'
import { useLocalStore } from 'mobx-react-lite'
import { User } from '@/domain'
import { runInAction } from 'mobx'

const USER = gql`
  query GetAuthor {
    user(id: "1") {
      id
      lastName
      firstName
      age
      todoes {
        id
        name
        done
      }
    }
  }
`

type StoreRequest = {
  loading: boolean
  result: ApolloQueryResult<any>
  model: User
}

export function useModel() {
  const [getAuthor, result] = useLazyQuery(USER)
  const store = useLocalStore(() => ({
    result,
    model: new User(),
    update(data: Partial<StoreRequest>) {
      Object.assign(this, data)
    },
    async refresh() {
      await getAuthor()
    },
  }))

  useEffect(() => {
    const user = result.data?.user

    runInAction(() => {
      store.update({
        result,
      })
      user && store.model.update(user)
    })
  }, [result])

  return store
}

const store = createStore(useModel)

export const Provider = store.Provider
export const Context = store.Context
export const useStore = store.useStore
