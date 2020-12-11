/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { useContext, createContext, useReducer } from 'react'
import { default as Env } from './Env'

// 创建一个全局 context
// 这里使用了 ReturnType 作为 Context 的范型声明
export const GlobalContext = createContext<ReturnType<typeof useGlobalStore>>(
  null
)

// custom hook：封装所有全局数据，用于 GlobalContext.Provider 的 value 属性赋值
export function useGlobalStore() {
  const env = useReducer(Env.reducer, Env.init())

  return {
    env,
  }
}

// custom hook：实现了 GlobalContext.Consumer 的功能
export function useGlobal() {
  return useContext(GlobalContext)
}
