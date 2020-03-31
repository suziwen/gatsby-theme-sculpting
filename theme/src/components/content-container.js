/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import React from "react"
import styled from '@emotion/styled'


const ContentContainer = ({children, ...props})=> {
  return (<div sx={{
    p: [3,  5],
    mx: 'auto',
    my: 0,
    maxWidth: '900px',
  }} {...props}>
    {children}
  </div>)
}

export default ContentContainer
