const React = require('react')
const {withPrefix} = require('gatsby')

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }, pluginOptions) => {
  let output = [
    <link key="zoomcss" rel="stylesheet" type="text/css" href={withPrefix('/') + "libs/zoom/zoom.css"}/>,
    <link key="defaultcss" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-default.css"}/>,
    <link key="componentscss" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-components.css"}/>,
    <link key="oswald" rel="stylesheet" type="text/css" href={withPrefix('/') + "fonts/Webfonts/oswald/stylesheet.css"}/>,
    <link key="zh" rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/zh.css"}/>,
    <link key="awesome" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/font-awesome.min.css"}/>,
    <link key="svgwithjs" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/svg-with-js.css"}/>
  ]
  setHeadComponents(output)
  setPostBodyComponents([
    <script key="zoomjs" src={withPrefix('/') + "libs/zoom/zoom-vanilla.min.js"}></script>,
  ])
}

