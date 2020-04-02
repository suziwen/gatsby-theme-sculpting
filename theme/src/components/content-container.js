/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"


const ContentContainer = ({children, ...props})=> {
  return (<div sx={{
    p: [3,  5],
    mx: 'auto',
    my: 0,
    minHeight: '100%',
    maxWidth: '900px',
  }} {...props}>
    {children}
  </div>)
}

export default ContentContainer
