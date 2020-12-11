/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { useRef, useEffect } from 'react'

export function useDidUpdate(fn, inputs?: any[]) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      fn()
    } else {
      didMountRef.current = true
    }
  }, inputs)
}
