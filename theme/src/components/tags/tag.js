/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import lodash from "lodash"

import ContextConsumer from "../context"
import mergePath from '../../utils/merge-path'
import Link from '../ui-link'


const Tag = ({ children, tag, ...props }) => (
  <ContextConsumer>
    {({pluginOptions: {basePath, tagsPath}})=>{
      return (
        <Link to={mergePath(basePath, `${tagsPath}${lodash.kebabCase(tag)}`)} {...props}>{children}</Link>
      )
    }}
  </ContextConsumer>
)

export default Tag

