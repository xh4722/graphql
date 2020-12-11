/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { Icon } from 'antd'

interface IPage {
  icon?: React.ReactNode
  path?: string
  name?: string
  children?: IPage[]
}

export const routers: IPage[] = [
  {
    path: '/',
    name: 'home',
    icon: <Icon type='home' />,
  },
]
