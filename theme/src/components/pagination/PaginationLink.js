/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import React from "react"
import { Link } from "gatsby"

const PaginationLink = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link to={to} {...props}>
      <Button variant={'secondary'}>
        {children}
    </Button>
      </Link>
    )
  }
  return null
}

export default PaginationLink
