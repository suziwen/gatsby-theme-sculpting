/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import get from "lodash/get";

import Pagination from "../components/pagination"
import ContentContainer from '../components/content-container'
import Link from '../components/ui-link'


const PostTocItems = ({items, depth=0, maxDepth=3, basePath='/'})=> {
  if (depth <= maxDepth && items && items.length > 0) {
    return (
      <ul>
        {items.map((tocItem)=>{
          const link = ("/" + basePath + "/" + tocItem.link).replace(/\/+/g, '/')
          return (<li key={link}>
            <Link to={link}>
            {tocItem.title}
            </Link>
            {tocItem.items && (<PostTocItems items={tocItem.items} depth={depth + 1} maxDepth= {maxDepth}/>)}
          </li>)
        })}
      </ul>
    )
  }
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
}

class BlogPostsIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const siteUrl = get(this, "props.data.site.siteMetadata.siteUrl");
    const posts = get(this, "props.data.allStoryWriterMarkdown.edges");
    const pagesTotal = get(this, "props.pageContext.pagesTotal");
    const currentPage = get(this, "props.pageContext.currentPage");
    const basePath = get(this, "props.pageContext.basePath");

    return (
          <ContentContainer>
            <Helmet bodyAttributes={{
              class: "roadbike-blog-list"
            }}>
              <title>博客列表</title>
            </Helmet>
            <div
            >
              {posts.map(({ node }) => (
                <div key={node.slug}>
                  <h1 sx={{
                    variant: `textStyles.heading`,
                    position: 'relative',
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
                      to={node.slug}
                      sx={{
                        bg: `background`,
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
                  </h1>
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
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
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
          listCover: cover{
            childImageSharp{
              fluid(maxWidth: 180) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          slug
          title
          toc
          docType
          excerpt
          tags
          createDate(formatString: "MMM DD,YYYY")
          updateDate(formatString: "YYYY-MM-DD")
          cover {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
