/** @jsx jsx */
import { jsx, Flex} from 'theme-ui'
import React from "react"
import ContextConsumer from "../components/context"
import SiteIdiom from "../components/site-idiom"


const styles = {
  alignItems: 'center',
  zIndex: 0,
  bg: 'background',
  borderTop: '1px solid',
  width: '100%',
  justifyContent: 'space-between',
  padding: 3,
  flexDirection: ['column', 'row'],
}

export default () => {

  return (
        <ContextConsumer>
          {({siteMetadata})=>{
            return (
              <Flex sx={styles}>
                <div sx={{
                  fontSize: [3,4],
                }}><SiteIdiom /></div>
                <div sx={{
                  fontFamily: 'english',
                  fontSize: [1, 2],
                  textAlign: ['center', 'right']
                }}>
                  <div>
                    Copyright © 2020 {siteMetadata.author}
                  </div>
                  <div>
                    Build with 
                    &nbsp;<a href="https://www.gatsbyjs.com/" sx={{variant: "styles.a"}} target="_blank" rel="noopener noreferrer">Gatsbyjs</a>&nbsp; 
                    and 
                    &nbsp;<a href="https://www.github.com/suziwen/gatsby-theme-sculpting" sx={{variant: "styles.a"}} target="_blank" rel="noopener noreferrer">Sculpting</a> 
                    &nbsp;theme
                  </div>
                </div>
              </Flex>
            )
          }}
        </ContextConsumer>
  )
}

