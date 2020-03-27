/** @jsx jsx */
import { jsx, Button, Link} from 'theme-ui'
import React from "react"

const PaginationLink = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link href={to} variant={'nav'} {...props}>
      <Button variant={'secondary'}>
        {children}
    </Button>
      </Link>
    )
  }
  return null
}

export default PaginationLink
