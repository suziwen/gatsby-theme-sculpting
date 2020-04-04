require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
const fs = require('fs')
const nodejieba = require("nodejieba")

const mergePath = (basePath = '/', path = '')=>{
  let result = "/" + basePath + "/" + path
  result = result.replace(/\/+/g, '/')
  return result
}

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
  let { mdx = true, contentPath = 'posts' , docType='posts', basePath = '/', tagsPath = 'tags', archivesPath ='archives'} = options
  if(!fs.existsSync(contentPath)) {
    // 如果用户未创建 contentPath 目录,就使用主题里默认的 posts
    contentPath = `${__dirname}/posts`
  }
  tagsPath = mergePath('', '/' + tagsPath + '/')
  archivesPath = mergePath('', '/' + archivesPath + '/')
  const siteMetadata = {
    title: "小书匠",
    siteUrl: "http://www.xiaoshujiang.com",
    author: "suziwen",
    idiom: "宁在一思进，莫在一思停",
    description: `一款让你爱不释手的写作软件`,
  }
  const pluginOptions = {
    tagsPath,
    archivesPath,
    basePath,
  }

  const plugins = [
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          pluginOptions,
          basePath,
        }
      }
    },
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
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve(`./src/layouts/index.js`)
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#9D7CBF`,
        showSpinner: true
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

  plugins.push(
  {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `
              {
                allStoryWriterMarkdown(
                  sort: { order: DESC, fields: [createDate] }
                  filter: {
                    docType: {eq: "${docType}"}
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      title
                      createDate
                      updateDate
                      tags
                      slug
                    }
                  }
                }
              }
            `,
            output: mergePath(basePath, `/rss.xml`),
            title: `Your Site's RSS Feed`,
            setup: ({
              query: {
                site: { siteMetadata },
              },
            }) => {
              return {
                title: siteMetadata.title,
                description: siteMetadata.description,
                feed_url: siteMetadata.siteUrl + mergePath(basePath, `/rss.xml`),
                site_url: siteMetadata.siteUrl,
                generator: `StoryWriter`,
              }
            },
            serialize: ({ query: { site, allStoryWriterMarkdown } }) =>
              allStoryWriterMarkdown.edges.map(({ node }) => {
                return {
                  title: node.title,
                  description: node.excerpt,
                  url: site.siteMetadata.siteUrl + mergePath(basePath , node.slug),
                  guid: site.siteMetadata.siteUrl + mergePath(basePath, node.slug),
                  custom_elements: [{ "content:encoded": node.html }],
                }
              }),
          },
        ],
      },
    },
  )

  if ( process.env.COMMENT_WIDGET === "disqus" && process.env.DISQUS_SHORT_NAME) {
    plugins.push({
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORT_NAME
      }
    })
  }

  return {
    siteMetadata: siteMetadata,
    plugins: plugins
  }
}
