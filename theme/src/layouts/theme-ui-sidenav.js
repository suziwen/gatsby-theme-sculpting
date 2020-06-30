/** @jsx jsx */
import { jsx, css } from 'theme-ui'
import React, { useState } from 'react'
import { Global } from '@emotion/core'
import merge from 'deepmerge'

const Overlay = ({ onClick }) => (
  <React.Fragment>
    <div
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
    <Global
      styles={css({
        body: {
          overflow: ['hidden', 'auto'],
        },
      })}
    />
  </React.Fragment>
)
export const AccordionButton = props => {
  const transform = props.open ? 'rotate(-180 8 8)' : 'rotate(0 8 8)'
  const disabled = props.pathname && props.pathname.includes(props.href)

  return (
    <button
      title="Expand Section"
      disabled={disabled}
      {...props}
      sx={{
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        m: 0,
        border: 0,
        borderRadius: 0,
        color: 'inherit',
        bg: 'transparent',
        ':hover,:focus': {
          color: 'primary',
        },
        '&:disabled': {
          opacity: 0.25,
        },
      }}>
      <svg viewBox="0 0 16 16" width="12" height="12">
        <g
          sx={{
            transformOrigin: '8 8',
            transition: 'transform .1s ease-out',
          }}
          transform={transform}>
          <path
            stroke="currentcolor"
            strokeWidth="2"
            fill="none"
            d="M14 6 L8 12 L2 6"
          />
        </g>
      </svg>
    </button>
  )
}

const NavLinks = ({ open, pathname = '', links, href, Link, ...props }) => {
  if (!links) return false
  if (!open && !pathname.includes(href)) return false

  return (
    <ul
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}>
      {links.map((link, j) => (
        <li key={j}>
          <Link
            href={link.props.href}
            children={link.props.children}
            className={link.props.className}
            sx={{
              pl: 4,
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export const AccordionNav = React.forwardRef(
  (
    { open, children, components = {}, className, pathname = '', ...props },
    ref
  ) => {
    const links = children
    const [expanded, setExpanded] = useState({})
    const Link = components.a || 'a'

    const toggle = i => e => {
      e.stopPropagation()
      setExpanded({
        ...expanded,
        [i]: !expanded[i],
      })
    }

    return (
      <div>
        {open && <Overlay {...props} />}
        <div
          ref={ref}
          className={className}
          sx={{
            position: ['fixed', 'sticky'],
            top: 0,
            left: 0,
            bottom: [0, 'auto'],
            zIndex: 1,
            minWidth: 0,
            width: 256,
            maxHeight: ['100vh', 'none'],
            overflowX: 'visible',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            transition: 'transform .2s ease-out',
            transform: [open ? 'translateX(0)' : 'translate(-100%)', 'none'],
            bg: ['background', 'transparent'],
          }}>
          <ul
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}>
            {links.map((link, i) => (
              <li key={i}>
                <div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Link
                    href={link.props.href}
                    children={link.props.children}
                    className={link.props.className}
                  />
                  {link.props.links && (
                    <AccordionButton
                      href={link.props.href}
                      pathname={pathname}
                      open={expanded[i]}
                      sx={{
                        ml: 'auto',
                      }}
                      onClick={toggle(i)}
                    />
                  )}
                </div>
                <NavLinks
                  {...link.props}
                  open={expanded[i]}
                  pathname={pathname}
                  Link={Link}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
)
