/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"
import TagsSection from "../components/tags/tags-section"
import Toc from "../components/toc"
import ProgressIndicator from "../components/progress-indicator"
import ContentContainer from '../components/content-container'
import Link from '../components/ui-link'

class BlogPostTemplate extends React.Component {
  render() {
    const props = this.props
    const post = this.props.data.storyWriterMarkdown;
    const prev = this.props.pageContext.prev
    const next = this.props.pageContext.next
    const location = this.props.location
    const BioLine = ({ children }) => (
      <p
        sx={{
          fontFamily: 'english'
        }}
      >
        {children}
      </p>
    )

    const postHtmlAndCss = `<style>${post.customCss}</style>\n${post.html}`

    return (
        <ContentContainer>
          {/* Add long list of social meta tags */}
          <Helmet>
            <title>{post.title}</title>
            <meta
              name="description"
              content={
                post.excerpt
              }
            />

            <meta property="og:description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:type" content="article" />
            <meta
              name="article:published_time"
              content={post.createDate}
            />
          </Helmet>
          <section
          >
            <div>
              <Toc location={location} />
              <ProgressIndicator />
              <BioLine>
                {post.updateDate}
              </BioLine>
            </div>
          </section>
          <h1
          >
            {post.title}
          </h1>
          <section className="post-body">
            <BaseStyles>
              <div dangerouslySetInnerHTML={{ __html: postHtmlAndCss }} />
            </BaseStyles>
          </section>
          <TagsSection
            tags={post.tags}
          />
          <div sx={{
            display: 'flex'
          }}>
            <div sx={{flex: 1, textAlign: `left`}}>
              {prev && (
                <Link to={prev.slug}>
                  <h4 sx={{
                    fontFamily: 'english'
                  }}>
                    <MdArrowBack style={{ verticalAlign: `sub` }} />
                    Previous</h4>
                  <span
                  >
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div sx={{flex: 1, textAlign: `right`}}>
              {next && (
                <Link to={next.slug}>
                  <h4 sx={{
                    fontFamily: 'english'
                  }}>Next
                    <MdArrowForward style={{ verticalAlign: `sub` }} />
                  </h4>
                  <span
                  >
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </ContentContainer>

    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    storyWriterMarkdown(slug: { eq: $slug }) {
      id
      html
      excerpt
      docType
      title
      customCss
      createDate(formatString: "MMMM DD, YYYY")
      updateDate(formatString: "MMMM DD, YYYY")
      tags
      cover {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
            originalImg
          }
        }
      }
    }
  }
`;
