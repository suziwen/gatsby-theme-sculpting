/** @jsx jsx */
import { jsx, BaseStyles, Link } from "theme-ui"
import { Link as GLink} from "gatsby"


export default ({children, ...props})=> {
  return (
    <Link
      as={GLink}
      {...props}
    >
      {children}
    </Link>
  )
}

