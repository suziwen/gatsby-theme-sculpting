module.exports = options => {
  const { mdx = true, contentPath = 'posts' } = options
  return {
    plugins: [
      "gatsby-plugin-theme-ui",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: 'src/covers',
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
      "gatsby-transformer-xsjzip"
    ]
  }
}
