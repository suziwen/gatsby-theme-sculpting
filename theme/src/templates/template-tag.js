/** @jsx jsx */
import { jsx, Heading} from 'theme-ui'
import React from "react"
import { Link, graphql } from "gatsby"
import ContentContainer from '../components/content-container'

import TagsAll from '../components/tags/tags-all'


const Tags = ({ pageContext, data, location }) => {
  const { tag, basePath } = pageContext
  const { edges, totalCount } = data.allStoryWriterMarkdown
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? `` : `s`
  } tagged with "${tag}"`

  return (
    <ContentContainer>
      <Heading>{tagHeader}</Heading>
      <TagsAll basePath={basePath} tag={tag}/>
      <ul>
        {edges.map(({ node }) => {
          const title = node.title
          const slug = node.slug
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </ContentContainer>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allStoryWriterMarkdown(
      sort: { fields: [updateDate], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          title
          docType
          slug
        }
      }
    }
  }
`;
