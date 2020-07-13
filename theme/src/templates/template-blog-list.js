/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import get from "lodash/get";

import Pagination from "../components/pagination"
import ContentContainer from '../components/content-container'
import Link from '../components/ui-link'
import mergePath from '../utils/merge-path'


const PostTocItems = ({items, depth=0, maxDepth=3, basePath='/'})=> {
  if (depth <= maxDepth && items && items.length > 0) {
    return (
      <ul>
        {items.map((tocItem)=>{
          return (<li key={tocItem.link}>
            <Link
              to={mergePath(basePath, tocItem.link)}
              sx={{
                color: `gray`,
                textDecoration: `none`,
              }}
            >
            {tocItem.title}
            </Link>
            {tocItem.items && (<PostTocItems items={tocItem.items} depth={depth + 1} maxDepth= {maxDepth} basePath={basePath}/>)}
          </li>)
        })}
      </ul>
    )
  }
  return (<></>)
}

const PostToc = ({tocStr, basePath})=>{
  let toc = null
  try {
    toc = JSON.parse(tocStr)
  } catch (e) {
  }
  if (toc && toc.length > 0) {
    return (<div>
      <PostTocItems items={toc} depth={0} maxDepth={3} basePath={basePath}/>
    </div>)
  }
  return (<></>)
}

class BlogPostsIndex extends React.Component {
  render() {
    const posts = get(this, "props.data.allStoryWriterMarkdown.edges");
    const basePath = get(this, "props.pageContext.basePath");

    return (
          <ContentContainer>
            <div>
              {posts.map(({ node }) => (
                <div key={node.slug}>
                  <Heading as='h1' sx={{
                    position: 'relative',
                    mt: 3,
                    '&:before': {
                      content: `"................................................................................................................................................."`,
                      textAlign: `right`,
                      color: `gray`,
                      fontSize: `.8em`,
                      bottom: `2px`,
                      position: `absolute`,
                      width: `98%`,
                      pl: `5px`,
                      letterSpacing: `2px`,
                      overflow: `hidden`,
                      zIndex: -1
                    }
                  }}>
                    <Link
                      to={mergePath(basePath, node.slug)}
                      sx={{
                        color: `text`,
                        bg: `background`,
                        textDecoration: `none`,
                        pr: `1ch`
                      }}
                    >{node.title}
                    <span sx={{
                      float: 'right',
                      pl: '1ch',
                      bg: `background`,
                      fontStyle: `normal`,
                      fontSize: `0.8em`,
                      fontFamily: 'english',
                      bottom: `0`,
                      top: `0.2em`,
                      position: `relative`
                    }}>
                      {node.createDate}
                    </span>
                  </Link>
                  </Heading>
                  <PostToc tocStr={node.toc} basePath={basePath}/>
                </div>
              ))}
              <Pagination context={this.props.pageContext} />
            </div>
          </ContentContainer>
    )
  }
}

export default BlogPostsIndex

export const pageQuery = graphql`
  query IndexQuery($docType: String, $limit: Int, $skip: Int) {
    allStoryWriterMarkdown(
      limit: $limit
      skip: $skip
      sort: { fields: [updateDate, slug], order: DESC }
      filter: {
        docType: {eq: $docType}
      }
    ) {
      edges {
        node {
          slug
          title
          toc
          docType
          excerpt
          tags
          createDate(formatString: "MMM DD,YYYY")
          updateDate(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;
