/* Copyright (C) 2016-present, Yuansuan.cn */

import { Item, BaseItem } from '../Item'

const initialValue = {
  id: '1',
  name: '起床',
  done: true,
}

describe('Model/Item', () => {
  it('constructor with no params', () => {
    const model = new Item()

    expect(model).toMatchObject(new BaseItem())
  })

  it('update', () => {
    const model = new Item()

    model.update(initialValue)

    expect(model).toMatchObject(initialValue)
  })

  it('constructor with params', () => {
    const model = new Item(initialValue)

    expect(model).toMatchObject(initialValue)
  })
})
