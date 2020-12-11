import React from 'react'
import { Icon } from 'antd'

interface IPage {
  component?: () => React.ReactNode
  icon?: React.ReactNode
  path: string
  name?: string
  children?: IPage[]
}

export const NORMAL_PAGES: IPage[] = []

export const LAYOUT_PAGES: IPage[] = [
  {
    component: () => import('./pages/Home'),
    path: '/home',
    icon: <Icon type='home' />,
    name: '主页',
  },
  {
    path: '/twoLevel',
    name: '二级页面',
    icon: <Icon type='home' />,
    children: [
      {
        path: '/secondary',
        name: '副页',
        component: () => import('./pages/404'),
      },
    ],
  },
]
