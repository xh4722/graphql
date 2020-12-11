/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import styled from 'styled-components'
import { Layout } from 'antd'

const { Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  height: 100vh;

  aside {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 999;
    user-select: none;
  }

  .logo {
    display: flex;
    margin: 16px 0;
    justify-content: center;
    align-items: center;

    img {
      height: 32px;
    }

    .title {
      color: #fff;
    }
  }

  .ant-menu {
    height: calc(100% - 64px);
    overflow-y: auto;
    padding-bottom: 20px;

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      background-color: white;
    }

    &::-webkit-scrollbar {
      width: 2px;
      background-color: white;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
      background-color: ${({ theme }) => theme.primaryColor};
    }
  }

  .ant-menu-item,
  .ant-menu-submenu {
    > span {
      a {
        color: hsla(0, 0%, 100%, 0.65);

        &:hover {
          color: white;
        }

        &::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: transparent;
          content: '';
        }
      }
    }
  }

  .ant-menu:not(.ant-menu-horizontal) {
    .ant-menu-item-selected {
      a {
        color: white;
      }
    }
  }
`

export const StyledBody = styled(Layout)``

export const StyledHeader = styled(Header)`
  &.ant-layout-header {
    background: #fff;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0 24px;
    z-index: 1;
  }

  .anticon {
    color: rgba(0, 0, 0, 0.65);
  }

  > .left {
    display: flex;
    align-items: center;

    > .anticon {
      font-size: 20px;
    }
  }

  > .right {
    display: flex;
    margin-left: auto;

    .anticon {
      font-size: 16px;
    }

    > * {
      cursor: pointer;
      margin: 0 6px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }
    }
  }
`

export const StyledContent = styled(Content)`
  height: calc(100vh - 64px);
  overflow: auto;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    background-color: white;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    background-color: gray;
  }
`
