/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { PageLayout } from './Layout'

export const wrapPageElement = ({ element, props }) => (
  <PageLayout {...props}>{element}</PageLayout>
)
