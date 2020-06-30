/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { AccordionNav } from './theme-ui-sidenav'
import NavLink from './nav-link'
import headers from '../header.yaml'

const components = {
  a: NavLink,
}

export default props => {
  const headerFragment =  headers.map((headerInfo) =>
        <a href={headerInfo.link} key={headerInfo.name}>
          {headerInfo.name}
        </a>
    )
  return (
  <AccordionNav
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
  >
    {headerFragment}
  </AccordionNav>
  )
}
