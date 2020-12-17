/* Copyright (C) 2016-present, Yuansuan.cn */

import { Model } from '../index'
import { Item } from '../Item'

jest.mock('../Item')

const initialValue = [
  {
    id: '1',
    name: '起床',
    done: true,
  },
  {
    id: '2',
    name: '吃早饭',
    done: false,
  },
]
const initialPageCtx = {
  index: 1,
  size: 10,
  total: 0,
}

describe('Model/TodoList', () => {
  it('constructor with no params', () => {
    const model = new Model()

    expect(model.list).toEqual([])
    expect(model.page_ctx).toEqual(initialPageCtx)
  })

  it('update', () => {
    const model = new Model()

    model.update({
      list: initialValue,
      page_ctx: {
        index: 2,
        size: 20,
        total: 2,
      },
    })

    expect(Item['mock'].calls.length).toEqual(initialValue.length)
    expect(Item['mock'].calls[0][0]).toEqual(initialValue[0])
    expect(Item['mock'].calls[1][0]).toEqual(initialValue[1])
    expect(model.page_ctx).toEqual({
      index: 2,
      size: 20,
      total: 2,
    })
  })

  it('constructor with params', () => {
    const model = new Model({
      list: initialValue,
      page_ctx: initialPageCtx,
    })

    expect(Item['mock'].calls.length).toEqual(initialValue.length)
    expect(Item['mock'].calls[0][0]).toEqual(initialValue[0])
    expect(Item['mock'].calls[1][0]).toEqual(initialValue[1])
    expect(model.page_ctx).toEqual(initialPageCtx)
  })
})
