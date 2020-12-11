/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import styled from 'styled-components'

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-page-header-heading-title {
    max-width: calc(100% - 100px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const StyledHeader = styled.div`
  background-color: white;
  padding: 16px 24px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
`

export const StyledContent = styled.div`
  flex: 1;
  margin: 24px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 10px 20px;
`
