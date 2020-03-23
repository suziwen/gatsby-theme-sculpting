/** @jsx jsx */
import React, { useState, useRef } from "react"
import { navigate, PageRenderer } from "gatsby"
import SiteMetadata from "../components/site-metadata"
import Transition from "../components/transition"
import ContextConsumer, { ContextProviderComponent } from "../components/context"

import { Global } from '@emotion/core'
import { Styled, Container, jsx, useThemeUI } from 'theme-ui'

import Header from './header'
import Sidenav from './sidenav'

export default ({pageContext, location, children}) => {
  const { theme: { colors = {} } } = useThemeUI()
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)
  const bodyStyles = {
    body: {
      margin: 0,
      color: colors.text,
      backgroundColor: colors.background
    }
  }
  return (
    <Styled.root>
      <Global styles={bodyStyles} />
      <SiteMetadata pathname={location.pathname} />
      <ContextProviderComponent>
        <ContextConsumer>
          {({data, set})=>{
            return (
              <>
                <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <div
                  ref={nav}
                  sx={{
                    display: ['block', 'flex'],
                  }}
                >
                  <Sidenav
                    open={menuOpen}
                    sx={{ display: [null, 'block'] }}
                    onFocus={() => setMenuOpen(true)}
                    onBlur={() => setMenuOpen(false)}
                    onClick={() => setMenuOpen(false)}
                  />
                  <div
                    sx={{
                      overflow: 'hidden',
                      px: 3,
                    }}
                  >
                    <Transition location={location}>
                      {children}
                    </Transition>
                  </div>
                </div>
              </>
            )
          }}
        </ContextConsumer>
      </ContextProviderComponent>
    </Styled.root>
  )
}