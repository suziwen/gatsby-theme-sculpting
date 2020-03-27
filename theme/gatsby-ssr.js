const React = require('react')
const {withPrefix} = require('gatsby')

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }, pluginOptions) => {
  let output = [
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "libs/zoom/zoom.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-default.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-components.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "fonts/Webfonts/xsj/stylesheet.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "fonts/Webfonts/oswald/stylesheet.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/zh.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/font-awesome.min.css"}/>,
    <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/svg-with-js.css"}/>
  ]
  setHeadComponents(output)
  setPostBodyComponents([
    <script src={withPrefix('/') + "libs/zoom/zoom-vanilla.min.js"}></script>,
  ])
}

