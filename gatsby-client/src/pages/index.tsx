import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Home = () => {
  const {
    server: { author },
  } = useStaticQuery(graphql`
    {
      server {
        author(id: 1) {
          id
          firstName
          lastName
        }
      }
    }
  `)

  return <div>{JSON.stringify(author)}</div>
}

export default Home
