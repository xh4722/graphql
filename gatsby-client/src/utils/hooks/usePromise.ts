/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { useState, useEffect } from 'react'

export function usePromise<T>(
  fn: () => Promise<T>,
  deps?: any[]
): [boolean, T, Error] {
  const [state, setState] = useState({
    loading: false,
    result: null,
    error: null,
  })

  useEffect(() => {
    setState({
      loading: true,
      result: null,
      error: null,
    })

    // fix race condition
    let didCancel = false

    const trigger = async () => {
      let result
      let error
      try {
        result = await fn()
      } catch (err) {
        error = err
      } finally {
        if (!didCancel) {
          setState({
            loading: false,
            result,
            error,
          })
        }
      }
    }

    trigger()

    return () => {
      didCancel = true
    }
  }, deps || [])

  return [state.loading, state.result, state.error]
}
