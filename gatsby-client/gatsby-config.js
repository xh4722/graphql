/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

module.exports = {
  siteMetadata: {
    title: 'graphql client',
    description: 'graphql client',
    image: '',
    url: '',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
        modifyVars: require('./src/themes/ant-custom.js'),
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'SERVER',
        fieldName: 'server',
        url: 'http://localhost:3001/graphql',
      },
    },
  ],
}
