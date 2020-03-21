import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import get from "lodash/get";

import Pagination from "../components/pagination"

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
          id={`reach-skip-nav`}
        >
          <Helmet bodyAttributes={{
            class: "roadbike-blog-list"
          }}>
            <title>博客</title>
          </Helmet>
          <div
          >
            {posts.map(({ node }) => (
              <div key={node.slug}>
                <h1>node.title</h1>
                <br/>
                <Link
                  to={node.slug}
                />
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
  query IndexQuery($limit: Int, $skip: Int) {
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
        docType: {eq: "blogs"}
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
          docType
          excerpt
          tags
          updateDate(formatString: "YYYY-MM-DD")
          cover {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          meta {
            title
          }
        }
      }
    }
  }
`;
