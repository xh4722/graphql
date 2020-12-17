/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { createStore } from '@ys/fe-utils/hooks'
import { useLocalStore } from 'mobx-react-lite'
import { todoServer } from '@/server'
import { Model } from './Model'
import { runInAction } from 'mobx'

type Store = {
  model: Model
  loading: boolean
  queryKey: string
  pageIndex: number
  pageSize: number
}

export function useModel() {
  const store = useLocalStore(() => ({
    model: new Model(),
    loading: false,
    queryKey: '',
    pageIndex: 1,
    pageSize: 10,
    update(data: Partial<Store>) {
      Object.assign(store, data)
    },
    async fetch(force = false) {
      try {
        store.update({
          loading: true,
        })
        const { list, page_ctx } = await todoServer.getList(
          {
            page_index: store.pageIndex,
            page_size: store.pageSize,
          },
          {
            force,
          }
        )

        runInAction(() => {
          store.update({
            loading: false,
          })
          this.model.update({
            list,
            page_ctx,
          })
        })
      } catch {
        store.update({
          loading: false,
        })
      }
    },
  }))

  return store
}

const store = createStore(useModel)

export const Provider = store.Provider
export const Context = store.Context
export const useStore = store.useStore
