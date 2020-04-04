/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import ContextConsumer from "../components/context"

const SiteMetadata = () => {
  return (
    <ContextConsumer>
      {({siteMetadata: {title}}) => {
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
    </ContextConsumer>
  )
}

export default SiteMetadata

