/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import lodash from "lodash"
import { graphql, StaticQuery } from "gatsby"

import mergePath from '../../utils/merge-path'
import Link from '../ui-link'


const Tag = ({ children, tag, ...props }) => (
  <StaticQuery
    query={graphql`
      query TagPathInfo {
        site {
          siteMetadata {
            basePath
            tagsPath
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { basePath, tagsPath },
      },
    }) => (
      <Link to={mergePath(basePath, `${tagsPath}${lodash.kebabCase(tag)}`)} {...props}>{children}</Link>
    )}
  />
)

export default Tag

