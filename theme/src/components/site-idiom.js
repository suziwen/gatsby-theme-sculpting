/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import ContextConsumer from "./context"
import XSJIdiom from "./xsj/idiom"

const SiteMetadata = () => {
  return (
    <ContextConsumer>
      {({siteMetadata: {idiom}}) => {
        if (idiom === "宁在一思进，莫在一思停") {
          return <XSJIdiom />
        }
        return (<span>{idiom}</span>)
      }}
    </ContextConsumer>
  )
}

export default SiteMetadata


