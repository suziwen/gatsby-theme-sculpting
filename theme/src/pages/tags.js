/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { Link, graphql } from "gatsby"
import ContentContainer from '../components/content-container'
import TagsAll from '../components/tags/tags-all'


const Tags = ({ pageContext: { basePath } }) => {
  return (
    <ContentContainer sx={{
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
    }}>
      <TagsAll basePath={basePath} />
    </ContentContainer>
  )
}
export default Tags



