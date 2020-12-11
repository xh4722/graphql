/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const StyledHome = styled.div`
  .body {
    font-size: 20px;
    font-weight: bolder;
  }
`

const GET_AUTHOR = gql`
  {
    author(id: 1) {
      id
      firstName
      lastName
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_AUTHOR)
  console.log(loading, error, data)

  return (
    <StyledHome>
      <div className='body'>Welcom to yuansuan frontend!😊</div>
    </StyledHome>
  )
}
