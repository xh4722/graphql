/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import * as React from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { observer, disposeOnUnmount } from 'mobx-react'
import { observable, action, reaction } from 'mobx'
import { env } from '@/domain'

import { StyledLayout, StyledBody, StyledContent, StyledHeader } from './style'
import { LAYOUT_PAGES } from '../router'

const { SubMenu } = Menu
const { Sider } = Layout

@observer
class Root extends React.Component<any> {
  get selectedKeys() {
    return [this.props.location.pathname]
  }

  @observable menuExpanded = true

  @observable openKeys = this.selectedKeys.map(key => key.split(/(?=\/)/))[0]
  @action
  updateOpenKeys = keys => {
    this.openKeys = keys
  }

  @disposeOnUnmount
  disposer = reaction(
    () => env.menuExpanded,
    expanded => {
      if (expanded) {
        this.updateOpenKeys(
          this.selectedKeys.map(key => key.split(/(?=\/)/))[0]
        )
      } else {
        this.updateOpenKeys([])
      }
    }
  )

  render() {
    const { selectedKeys, openKeys } = this
    const { menuExpanded } = env

    return (
      <StyledLayout>
        <Sider trigger={null} collapsible collapsed={!menuExpanded}>
          <div className='logo'>
            <img
              src={
                menuExpanded
                  ? require('@/assets/images/logo_text.svg')
                  : require('@/assets/images/logo.svg')
              }
              alt='yuansuan logo'
            />
          </div>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={this.updateOpenKeys}
            className='menu'>
            {LAYOUT_PAGES.filter(item => item.name !== undefined).map(item =>
              item.children ? (
                <SubMenu
                  key={item.path}
                  title={
                    <span>
                      {item.icon}
                      <span>{item.name}</span>
                    </span>
                  }>
                  {item.children
                    .filter(item => item.name !== undefined)
                    .map(sub => (
                      <Menu.Item key={`${item.path}${sub.path}`}>
                        <Link to={`${item.path}${sub.path}`}>
                          {sub.icon}
                          {sub.name}
                        </Link>
                      </Menu.Item>
                    ))}
                </SubMenu>
              ) : (
                <Menu.Item key={item.path}>
                  {item.icon}
                  <span>
                    <Link to={item.path}>{item.name}</Link>
                  </span>
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <StyledBody>
          <StyledHeader>
            <div className='left'>
              <Icon
                onClick={() => env.toggleMenuExpanded()}
                type={menuExpanded ? 'menu-fold' : 'menu-unfold'}
              />
            </div>
            <div className='right'></div>
          </StyledHeader>
          <StyledContent>{this.props.children}</StyledContent>
        </StyledBody>
      </StyledLayout>
    )
  }
}

export default withRouter(Root)
