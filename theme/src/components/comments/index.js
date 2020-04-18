/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import '@suziwen/gitalk/dist/gitalk.css'
import Gitalk from "gatsby-plugin-gitalk"

import ContextConsumer from "../context"

import mergePath from '../../utils/merge-path'
import MD5 from '../../utils/md5'

class Comments extends React.Component {

  render() {
    const post = this.props.post
    const siteUrl = this.props.siteUrl
    const basePath = this.props.basePath
    return (
      <ContextConsumer>
        {({ pluginOptions: {commentType}})=>{
            let disqusConfig = null
            if (commentType === "disqus") {
              disqusConfig = {
                url: siteUrl + mergePath(basePath, post.slug),
                identifier: MD5(post.slug || post.id),
                title: post.title
              }
            }
            let gitalkConfig = null
            if (commentType === "gitalk") {
              gitalkConfig = {
                id: MD5(post.slug || post.id),
                title: post.title
              }
              if (typeof window !== 'undefined') {
                const location = window.location
                gitalkConfig['url'] = location.origin + location.pathname + location.search
              }
            }
          return (
            <>
              {!!disqusConfig && (<CommentCount config={disqusConfig} placeholder={'...'} />)}
              {!!disqusConfig && (<Disqus config={disqusConfig} />)}
              {!!gitalkConfig && typeof window !== 'undefined' && (<Gitalk
                options={gitalkConfig}
              />)}
            </>
          )
        }}
      </ContextConsumer>
    )

  }
}

export default Comments
