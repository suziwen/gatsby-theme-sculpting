/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import GitalkComponent from "gitalk/dist/gitalk-component"
import mergePath from '../../utils/merge-path'
import MD5 from '../../utils/md5'

class Comments extends React.Component {

  render() {
    const post = this.props.post
    const siteUrl = this.props.siteUrl
    const basePath = this.props.basePath
    let disqusConfig = null
    if (process.env.COMMENT_WIDGET === "disqus" && !!process.env.DISQUS_SHORT_NAME) {
      disqusConfig = {
        url: siteUrl + mergePath(basePath, post.slug),
        identifier: MD5(post.slug || post.id),
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
        id: MD5(post.slug || post.id),
        title: post.title
      }
    }
    return (
      <>
        {!!disqusConfig && (<CommentCount config={disqusConfig} placeholder={'...'} />)}
        {!!disqusConfig && (<Disqus config={disqusConfig} />)}
        {!!gitalkConfig && (<GitalkComponent
          options={gitalkConfig}
        />)}
      </>
    )

  }
}

export default Comments
