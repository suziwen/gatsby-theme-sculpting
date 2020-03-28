const fs = require('fs')
const nodejieba = require("nodejieba")

const tokenizerFn = function(str){
  let results = []
  const enStrs = str.split(/\W+/)
  results = results.concat(enStrs)
  const zhStr = str.replace(/[\w\s\,\.\!\?\:]+/gm, ',')
  const zhStrs = nodejieba.cutForSearch(zhStr)
  results = results.concat(zhStrs)
  return results
}

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
        resolve: `gatsby-plugin-local-search`,
        options: {
          name: 'pages',
          engine: 'flexsearch',
          engineOptions: {
            encode: 'icase',
            tokenize: tokenizerFn,
            threshold: 1,
            resolution: 3,
            depth: 1,
            split: /[\s\,\.\!\?\:]+/
          },
          query: `
            {
              allStoryWriterMarkdown {
                nodes {
                  id
                  title
                  tags
                  slug
                  rawMarkdownBody
                }
              }
            }
          `,
          ref: `id`,
          index: ['title', 'body'],
          store: ['id', 'slug', 'title'],
          normalizer: ({ data }) =>
            data.allStoryWriterMarkdown.nodes.map(node => ({
              id: node.id,
              slug: node.slug,
              title: node.title,
              body: node.rawMarkdownBody,
            })),
        }
      },
      {
        resolve: "gatsby-plugin-transition-link",
        options: {
          layout: require.resolve(`./src/layouts/index.js`)
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
