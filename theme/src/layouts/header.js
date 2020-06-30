/** @jsx jsx */
import { jsx, Flex, useColorMode, useThemeUI } from 'theme-ui'
import React from "react"

import Headroom from "react-headroom"
import MenuButton from './menu-button'
import NavLink from './nav-link'
import headers from '../header.yaml'
import Button from './button'
import SiteTitle from '../components/site-title'

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

  const headerFragment =  headers.map((headerInfo) =>
      <li key={headerInfo.name}>
        <NavLink href={headerInfo.link}>
          {headerInfo.name}
        </NavLink>
      </li>
    )
  return (
        <Headroom style={{zIndex: 2}}>
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
            <SiteTitle />
            <div sx={{
              display: ['none', 'block'],
              ml: 'auto'
            }}>
              <ul>
                {headerFragment}
              </ul>
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
