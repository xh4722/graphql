/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import { hot } from 'react-hot-loader/root'
import Loadable from 'react-loadable'
import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'
import Layout from './Layout'
import { NORMAL_PAGES, LAYOUT_PAGES } from './router'

const Loading = ({ error }) => {
  if (error) {
    throw error
  }

  return <div>Loading...</div>
}

const UserRoute = ({ component: Component, path, perm, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

const createRoute = Route => page => (
  <Route
    exact={page.exact}
    key='ysfe'
    path={page.path}
    perm={page.perm}
    component={Loadable({
      loader: page.component,
      loading: Loading,
    })}
  />
)

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        {NORMAL_PAGES.map(createRoute(Route))}
        {LAYOUT_PAGES.map(item =>
          item.children
            ? item.children.map(child =>
                createRoute(UserRoute)({
                  ...child,
                  path: `${item.path}${child.path}`,
                })
              )
            : createRoute(UserRoute)(item)
        )}
        <Route exact path='/' render={() => <Redirect to='/home' />} />
        <Route
          component={Loadable({
            loader: () => import('./pages/404'),
            loading: Loading,
          })}
        />
      </Switch>
    </Router>
  )
}

export default hot(App)
