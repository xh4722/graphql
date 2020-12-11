/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'

import { Header } from './Header'
import { StyledLayout, StyledHeader, StyledContent } from './style'

interface IProps {
  header?: React.ReactNode | null
}

export class Page extends React.Component<IProps> {
  render() {
    const {
      header = (
        <StyledHeader>
          <Header />
        </StyledHeader>
      ),
    } = this.props

    return (
      <StyledLayout>
        {header}
        <StyledContent>{this.props.children}</StyledContent>
      </StyledLayout>
    )
  }
}
