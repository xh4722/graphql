/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { useState, useEffect, useRef } from 'react'

export function useTimeout(timeout) {
  const [time, setTime] = useState(timeout)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(count => count - 1)
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current)
      timer.current = null
    }
  }, [time])

  return time
}
