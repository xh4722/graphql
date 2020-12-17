/* Copyright (C) 2016-present, Yuansuan.cn */

import { createGraphqlClient } from '@ys/fe-utils'
import { InMemoryCache, from } from '@apollo/client'

export const apolloClient = createGraphqlClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: link => from([link]),
})
