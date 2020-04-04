/** @jsx jsx */
import { jsx, Flex} from 'theme-ui'
import React from "react"


const styles = {
  alignItems: 'center',
  zIndex: 0,
  bg: 'background',
  borderTop: '1px solid',
  width: '100%',
  justifyContent: 'space-between',
  padding: 3,
}

export default () => {

  return (
          <Flex sx={styles}>
            <div></div>
            <div sx={{
              fontFamily: 'english',
              textAlign: 'right'
            }}>
              <div>
                Copyright © 2020 suziwen
              </div>
              <div>
                Build with 
                &nbsp;<a href="https://www.gatsbyjs.com/" sx={{variant: "styles.a"}} target="_blank" rel="noopener noreferrer">Gatsbyjs</a>&nbsp; 
                and 
                &nbsp;<a href="https://www.github.com/suziwen/gatsby-theme-stone-sculpture" sx={{variant: "styles.a"}} target="_blank" rel="noopener noreferrer">Stone Sculpture</a> 
                &nbsp;theme
              </div>
            </div>
          </Flex>
  )
}

