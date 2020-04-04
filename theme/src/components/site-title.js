/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { graphql, StaticQuery } from "gatsby"

const SiteMetadata = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { siteUrl, title },
      },
    }) => {
      const style = {
        ml: 3,
        fontWeight: 'bold',
        fontSize: '1.5em'
      }
      if (title === '小书匠') {
        style['fontFamily'] = 'webfontxiaoshujiang, sans-serif'
      }
      return (
        <div sx={style}>
          {title}
        </div>
      )
    }}
  />
)

export default SiteMetadata

