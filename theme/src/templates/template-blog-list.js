/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import get from "lodash/get";

import Pagination from "../components/pagination"


const PostTocItems = ({items, depth=0, maxDepth=3})=> {
  if (depth <= maxDepth && items && items.length > 0) {
    return (
      <ul>
        {items.map((tocItem)=>{
          return (<li>
            <Link to={tocItem.link}>
            {tocItem.title}
            {tocItem.items && (<PostTocItems items={tocItem.items} depth={depth + 1} maxDepth= {maxDepth}/>)}
            </Link>
          </li>)
        })}
      </ul>
    )
  }
}

const PostToc = ({tocStr})=>{
  let toc = null
  try {
    toc = JSON.parse(tocStr)
  } catch (e) {
  }
  if (toc && toc.length > 0) {
    return (<div>
      <PostTocItems items={toc} depth={0} maxDepth={3}/>
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

    return (
          <main
          >
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
                      bottom: `0`,
                      top: `0.2em`,
                      position: `relative`
                    }}>
                      {node.createDate}
                    </span>
                  </Link>
                  </h1>
                  <PostToc tocStr={node.toc}/>
                </div>
              ))}
              <Pagination context={this.props.pageContext} />
            </div>
          </main>
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
