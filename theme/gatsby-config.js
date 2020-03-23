module.exports = options => {
  const { mdx = true, contentPath = 'posts' } = options
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
          name: contentPath
        }
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      "gatsby-transformer-xsjzip"
    ]
  }
}
