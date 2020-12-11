/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React, { useState, useEffect } from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link } from 'gatsby'
import { routers } from './router'
import { StyledLayout, StyledBody, StyledContent, StyledHeader } from './style'
import { useGlobal } from '@/store'
import { Page } from './Page'
import { useStaticQuery, graphql } from 'gatsby'

const { SubMenu } = Menu
const { Sider } = Layout

const allOpendedKeys = routers
  .filter(item => !!item.children)
  .map(item => item.path || item.name)

export function AppLayout({ location, children }) {
  const images = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "images/logo.svg" }) {
        publicURL
      }
      logo_text: file(relativePath: { eq: "images/logo_text.svg" }) {
        publicURL
      }
    }
  `)

  const {
    env: [{ menuExpanded }, dispatch],
  } = useGlobal()

  // selectedkeys
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])
  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname])

  // opendedKeys
  const [opendedKeys, setOpendedKeys] = useState(allOpendedKeys)
  useEffect(() => {
    if (menuExpanded) {
      setOpendedKeys(allOpendedKeys)
    } else {
      setOpendedKeys([])
    }
  }, [menuExpanded])

  function toggleMenu() {
    dispatch({
      type: 'TOGGLE_MENU',
      payload: !menuExpanded,
    })
  }

  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={!menuExpanded}>
        <div className='logo'>
          <img
            src={
              menuExpanded ? images.logo_text.publicURL : images.logo.publicURL
            }
            alt='yuansuan logo'
          />
          {menuExpanded && <span className='title'></span>}
        </div>
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={selectedKeys}
          openKeys={opendedKeys}
          onOpenChange={setOpendedKeys}
          className='menu'>
          {routers
            .filter(item => item.name !== undefined)
            .map(item =>
              item.children ? (
                <SubMenu
                  key={item.path || item.name}
                  title={
                    <span>
                      {item.icon}
                      <span>{item.name}</span>
                    </span>
                  }>
                  {item.children
                    .filter(item => item.name !== undefined)
                    .map(sub => (
                      <Menu.Item key={`${item.path || ''}${sub.path}`}>
                        <Link to={`${item.path || ''}${sub.path}`}>
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
              onClick={toggleMenu}
              type={menuExpanded ? 'menu-fold' : 'menu-unfold'}
            />
          </div>
          <div className='right'></div>
        </StyledHeader>
        <StyledContent id='layout_body'>
          <Page header={null}>{children}</Page>
        </StyledContent>
      </StyledBody>
    </StyledLayout>
  )
}
