/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import styled from 'styled-components'

const StyledHome = styled.div`
  .body {
    font-size: 20px;
    font-weight: bolder;
  }
`

export default function Home() {
  return (
    <StyledHome>
      <div className='body'>Welcom to yuansuan frontend!😊</div>
    </StyledHome>
  )
}
