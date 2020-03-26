/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { AccordionNav } from '@theme-ui/sidenav'
import NavLink from './nav-link'
import Sidebar from '../header.mdx'

const components = {
  wrapper: AccordionNav,
  a: NavLink,
}

export default props => {
  return (
  <Sidebar
    {...props}
    components={components}
    sx={{
      display: [null, 'none'],
      width: ['initial', 'min-content'],
      flex: 'none',
      px: 3,
      pt: 3,
      pb: 4,
      mt: [64, 0],
    }}
  />
  )
}
