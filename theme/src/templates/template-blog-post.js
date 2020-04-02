/** @jsx jsx */
import { jsx, Heading, BaseStyles } from "theme-ui"
import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"

import TagsSection from "../components/tags/tags-section"
import Toc from "../components/toc"
import ProgressIndicator from "../components/progress-indicator"
import ContentContainer from '../components/content-container'
import Link from '../components/ui-link'
import Comments from '../components/comments'
import mergePath from '../utils/merge-path'

class BlogPostTemplate extends React.Component {
  render() {
    const props = this.props
    const post = this.props.data.storyWriterMarkdown;
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const prev = this.props.pageContext.prev
    const next = this.props.pageContext.next
    const basePath = this.props.pageContext.basePath
    const tagsPath = this.props.pageContext.tagsPath
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
          <section>
            <Toc location={location} />
            <ProgressIndicator />
            <BioLine>
              {post.updateDate}
            </BioLine>
          </section>
          <Heading as="h1">
            {post.title}
          </Heading>
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
                <Link to={mergePath(basePath, prev.slug)}>
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
                <Link to={mergePath(basePath, next.slug)}>
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
          <Comments  post={post} siteUrl={siteUrl} basePath={basePath}/>
        </ContentContainer>

    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    storyWriterMarkdown(slug: { eq: $slug }) {
      id
      html
      excerpt
      docType
      slug
      title
      customCss
      createDate(formatString: "MMMM DD, YYYY")
      updateDate(formatString: "MMMM DD, YYYY")
      tags
    }
  }
`;
