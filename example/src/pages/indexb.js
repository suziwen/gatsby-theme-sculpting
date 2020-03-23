/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React from "react"

export default () => {
  let postHtmlAndCss = `<h1>hello world</h1>`
  return (<div>
  <BaseStyles>
    <h2>good luck</h2>
    <div dangerouslySetInnerHTML={{ __html: postHtmlAndCss }} />
    <div> <a href="http://www.baidu.com" target="_blank">baidu</a></div>
    <div
    sx={{
      padding: 4,
      color: 'background',
      backgroundColor: 'primary'
    }}
    >Homepage in a user's site</div>
  </BaseStyles>
  </div>)}
