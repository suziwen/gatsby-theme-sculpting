/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import ContextConsumer from "../context"
import FontFile from "./idiom.woff"

const XSJTitle = ()=> {
  return (
    <ContextConsumer>
      {({siteMetadata: {idiom}}) => {
        const style = {
          "@font-face": {
            fontFamily: `webfontxiaoshujiangidiom`,
            src: `url(${FontFile})  format('woff')`,
            fontWeight: `normal`,
            fontStyle: `normal`,
          },
          fontFamily: 'webfontxiaoshujiangidiom, sans-serif',
        }
        const fontStyle = {
        }
        return (
          <span sx={style}>
            {idiom}
          </span>
        )
      }}
    </ContextConsumer>
  )
}


export default XSJTitle

