const React = require('react')
const {withPrefix} = require('gatsby')

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }, pluginOptions) => {
  // 如果是主题修改了静态文件,可以在 pluginVersion 里调整一个值
  const pluginVersion = "sculpting_1_"
  // 如果是第三方使用该主题的用户想修改静态文件,可以传入 staticFileVerion 参数,来保证静态文件最新
  const staticVersion = pluginVersion + (pluginOptions.staticFileVersion || '1')
  let output = [
    <link key="zoomcss" rel="stylesheet" type="text/css" href={withPrefix('/') + "libs/zoom/zoom.css?version=" + staticVersion}/>,
    <link key="defaultcss" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-default.css?version=" + staticVersion}/>,
    <link key="componentscss" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-components.css?version=" + staticVersion}/>,
    <link key="oswald" rel="stylesheet" type="text/css" href={withPrefix('/') + "fonts/Webfonts/oswald/stylesheet.css?version=" + staticVersion}/>,
    <link key="zh" rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/zh.css?version=" + staticVersion}/>,
    <link key="awesome" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/font-awesome.min.css?version=" + staticVersion}/>,
    <link key="svgwithjs" rel="stylesheet" type="text/css" href={withPrefix('/') + "css/svg-with-js.css?version=" + staticVersion}/>
  ]
  setHeadComponents(output)
  setPostBodyComponents([
    <script key="zoomjs" src={withPrefix('/') + "libs/zoom/zoom-vanilla.min.js"}></script>,
  ])
}

