/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { AppLayout } from './Layout'
import { SEO } from '@/components'

export function PageLayout(props) {
  return (
    <>
      <SEO />
      <AppLayout {...props} />
    </>
  )
}
