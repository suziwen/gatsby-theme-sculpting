/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import GitalkComponent from "gitalk/dist/gitalk-component"
import TagsSection from "../components/tags/tags-section"
import Toc from "../components/toc"
import ProgressIndicator from "../components/progress-indicator"
import ContentContainer from '../components/content-container'
import mergePath from '../utils/merge-path'
import Link from '../components/ui-link'

class BlogPostTemplate extends React.Component {
  render() {
    const props = this.props
    const post = this.props.data.storyWriterMarkdown;
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const prev = this.props.pageContext.prev
    const next = this.props.pageContext.next
    const basePath = this.props.pageContext.basePath
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
    let disqusConfig = null
    if (process.env.COMMENT_WIDGET === "disqus" && !!process.env.DISQUS_SHORT_NAME) {
      disqusConfig = {
        url: siteUrl + mergePath(basePath, post.slug),
        identifier: post.slug || post.id,
        title: post.title
      }
    }
    let gitalkConfig = null
    if (process.env.COMMENT_WIDGET === "gitalk") {
      gitalkConfig = {
        clientID: process.env.GITALK_CLIENT_ID,
        clientSecret: process.env.GITALK_CLIENT_SECRET,
        repo: process.env.GITALK_REPO,
        owner: process.env.GITALK_OWNER,
        admin: [process.env.GITALK_ADMIN],
        id: post.slug || post.id,
        title: post.title
      }
    }

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
          {!!disqusConfig && (<CommentCount config={disqusConfig} placeholder={'...'} />)}
          {!!disqusConfig && (<Disqus config={disqusConfig} />)}
          {!!gitalkConfig && (<GitalkComponent
            clientID={gitalkConfig.clientID}
            clientSecret={gitalkConfig.clientSecret}
            repo={gitalkConfig.repo}
            owner={gitalkConfig.owner}
            admin={gitalkConfig.admin}
            title={gitalkConfig.title}
            id={gitalkConfig.id}
          />)}
          
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
      slug
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
