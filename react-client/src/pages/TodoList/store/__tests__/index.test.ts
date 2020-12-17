/* Copyright (C) 2016-present, Yuansuan.cn */

import { renderHook } from '@testing-library/react-hooks'
import { useModel } from '../index'

describe('store', () => {
  it('init', () => {
    const { result } = renderHook(() => useModel())

    expect(result.current.queryKey).toEqual('')
    expect(result.current.pageIndex).toEqual(1)
    expect(result.current.pageSize).toEqual(10)
  })
})
