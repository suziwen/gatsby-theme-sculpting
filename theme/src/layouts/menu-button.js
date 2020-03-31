/** @jsx jsx */
import { jsx } from 'theme-ui'
import {MdMenu, MdClose} from "react-icons/md"

export default ({menuOpen, ...props}) => (
  <button
    title="Toggle Menu"
    {... props}
    sx={{
      fontFamily: 'inherit',
      fontSize: 24,
      color: 'inherit',
      bg: 'transparent',
      width: 32,
      height: 32,
      p: 1,
      m: 0,
      ml: 3,
      border: 0,
      appearance: 'none',
      ':focus': {
        outline: '2px solid',
      },
      '@media screen and (min-width: 40em)': {
        display: 'none',
      },
    }}
  >
    {menuOpen?(<MdClose/>):(<MdMenu />)}
  </button>
)
