/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { RouterType } from '@ys/components/dist/PageLayout'

export const NORMAL_PAGES: RouterType[] = []

export const LAYOUT_PAGES: RouterType[] = [
  {
    component: () => import('./pages/Home'),
    path: '/home',
    icon: <HomeOutlined />,
    name: '主页',
  },
]
