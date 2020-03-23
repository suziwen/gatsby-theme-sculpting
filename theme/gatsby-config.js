const fs = require('fs')

module.exports = options => {
  let { mdx = true, contentPath = 'posts' , docType='posts'} = options
  if(!fs.existsSync(contentPath)) {
    // 如果用户未创建 contentPath 目录,就使用主题里默认的 posts
    contentPath = `${__dirname}/posts`
  }

  return {
    siteMetadata: {
      title: "小书匠",
      siteUrl: "http://www.xiaoshujiang.com",
      description: `一款让你爱不释手的写作软件`
    },
    plugins: [
      {
        resolve: `gatsby-plugin-layout`,
        options: {
          component: require.resolve(`./src/layouts/index.js`)
        }
      },
      "gatsby-plugin-theme-ui",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/covers`,
          name: 'covers'
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: docType
        }
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-mdx`,
      "gatsby-transformer-xsjzip"
    ]
  }
}
