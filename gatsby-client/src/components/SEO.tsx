/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type IProps = {
  title: string
  description: string
  image: string
  pathname: string
  article: boolean
}

export function SEO({
  title,
  description,
  image,
  pathname,
  article,
}: Partial<IProps>) {
  const {
    site: {
      siteMetadata: { defaultTitle, defaultDescription, siteUrl, defaultImage },
    },
    favicon: { publicURL },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl: url
          defaultImage: image
        }
      }
      favicon: file(relativePath: { eq: "images/favicon.ico" }) {
        publicURL
      }
    }
  `)

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || '/'}`,
  }

  return (
    <Helmet title={seo.title}>
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />
      {seo.url && <meta property='og:url' content={seo.url} />}
      {(article ? true : null) && <meta property='og:type' content='article' />}
      {seo.title && <meta property='og:title' content={seo.title} />}
      {seo.description && (
        <meta property='og:description' content={seo.description} />
      )}
      {seo.image && <meta property='og:image' content={seo.image} />}
      <meta name='twitter:card' content='summary_large_image' />
      {seo.title && <meta name='twitter:title' content={seo.title} />}
      {seo.description && (
        <meta name='twitter:description' content={seo.description} />
      )}
      {seo.image && <meta name='twitter:image' content={seo.image} />}
      <link rel='shortcut icon' href={publicURL}></link>
    </Helmet>
  )
}
