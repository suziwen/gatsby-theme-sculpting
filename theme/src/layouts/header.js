/** @jsx jsx */
import { jsx, Container, Flex, useColorMode } from 'theme-ui'
import React from "react"
import { MDXProvider } from '@mdx-js/react'

import Headroom from "react-headroom"
import logoData from "../assets/logo-icon.png"
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Content from '../header.mdx'
import Button from './button'

const modes = ['light', 'dark', 'deep', 'swiss']

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

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
      <Headroom>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Flex sx={styles}>
            <MenuButton
              onClick={e => {
                setMenuOpen(!menuOpen)
                if (!nav.current) return
                const navLink = nav.current.querySelector('a')
                if (navLink) navLink.focus()
              }}
            />
            <div sx={{
              ml: 4,
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
                mr: 4 
              }}
              onClick={cycleMode}>
              {mode}
            </Button>
          </Flex>
        </Flex>
      </Headroom>
  )
}
