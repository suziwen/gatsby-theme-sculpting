/** @jsx jsx */
import { jsx, Flex, useColorMode, useThemeUI } from 'theme-ui'
import React from "react"
import { MDXProvider } from '@mdx-js/react'

import Headroom from "react-headroom"
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Content from '../header.mdx'
import Button from './button'

const components = {
  a: NavLink
}

const styles = {
  alignItems: 'center',
  bg: 'background',
  borderBottom: '1px solid',
  width: '100%',
  h1: {
    m: 0
  },
  ul: {
    ml: 'auto',
    display: 'flex',
    listStyleType: 'none',
  },
  li: {
    ml: 3
  }
}

export default ({ menuOpen, setMenuOpen, nav }) => {
  const [mode, setMode] = useColorMode()
  const { theme: { colors = {} } } = useThemeUI()

  const cycleMode = e => {
    const modes = ['light']
    Object.keys( colors.modes || {} ).forEach((_mode)=> modes.push(_mode))
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
      <Headroom>
          <Flex sx={styles}>
            <MenuButton
              menuOpen={menuOpen}
              onClick={e => {
                setMenuOpen(!menuOpen)
                if (!nav.current) return
                const navLink = nav.current.querySelector('a')
                if (navLink) navLink.focus()
              }}
            />
            <div sx={{
              ml: 3,
              fontFamily: 'webfontxiaoshujiang, sans-serif',
              fontWeight: 'bold',
              fontSize: '1.5em'
            }}>小书匠</div>
            <div sx={{
              display: ['none', 'block'],
              ml: 'auto'
            }}>
              <MDXProvider components={components}>
                <Content />
              </MDXProvider>
            </div>
            <Button
              sx={{
                ml: ['auto', 2],
                mr: 3
              }}
              onClick={cycleMode}>
              {mode}
            </Button>
          </Flex>
      </Headroom>
  )
}
