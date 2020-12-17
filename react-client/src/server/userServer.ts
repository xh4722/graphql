/* Copyright (C) 2016-present, Yuansuan.cn */

import { apolloClient } from '@/utils'
import { gql } from '@apollo/client'

const User_LIST = gql`
  query userList {
    list: userList {
      id
      firstName
      lastName
      age
    }
  }
`

export const userServer = {
  async getList() {
    const {
      data: { list },
    } = await apolloClient.query({
      query: User_LIST,
    })

    return {
      list,
    }
  },
}
