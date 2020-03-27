/** @jsx jsx */
import { jsx, Flex} from 'theme-ui'
import React from "react"


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

export default () => {

  return (
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Flex sx={styles}>
            <div sx={{ml: 4}}>小书匠</div>
            <div>
              <div>
                suziwen © 2020
              </div>
              <div>
                theme by xiaoshujiang.com
              </div>
            </div>
          </Flex>
        </Flex>
  )
}

