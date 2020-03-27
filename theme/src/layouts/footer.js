/** @jsx jsx */
import { jsx, Flex} from 'theme-ui'
import React from "react"


const styles = {
  alignItems: 'center',
  bg: 'background',
  borderTop: '1px solid',
  width: '100%',
  justifyContent: 'space-between',
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
          <Flex sx={styles}>
            <div sx={{ml: 4}}>小书匠</div>
            <div sx={{
              mr: 4,
              fontFamily: 'english'
            }}>
              <div>
                suziwen © 2020
              </div>
              <div>
                theme by xiaoshujiang.com
              </div>
            </div>
          </Flex>
  )
}

