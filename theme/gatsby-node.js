const _ = require(`lodash`)
const fs = require(`fs`)
const Promise = require(`bluebird`)
const path = require(`path`)
const moment = require(`moment`)
const mkdirp = require(`mkdirp`)
const mergePath = (basePath = '/', path = '')=>{
  let result = "/" + basePath + "/" + path
  result = result.replace(/\/+/g, '/')
  return result
}


const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Ensure user has create src/pages/index.js
let hasCustomHomePage = false
let totalPost = 0

exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const contentPath = themeOptions.contentPath || 'posts'
  const contentDir = path.join(program.directory, contentPath)
  if (fs.existsSync(path.join(program.directory, `src/pages/index.js`))) {
    hasCustomHomePage = true
  }
  if (!fs.existsSync(contentDir)){
    mkdirp.sync(contentDir)
  }
}


exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (page.path === '/index-default/') {
    deletePage(page)
    if (totalPost === 0) {
      createPage({
        ...page,
        path: '/'
      })
    }
  }
}

exports.createPages = ({ graphql, actions }, pluginOptions) => {
  const { createPage, createRedirect } = actions
  const docType =  pluginOptions.docType || 'posts';
  const pageSize = pluginOptions.pageSize ||  4;
  const basePath = pluginOptions.basePath || '/';
  let tagsPath = pluginOptions.tagsPath || 'tags';
  let archivesPath = pluginOptions.archivesPath || 'archives';
  tagsPath = mergePath('', '/' + tagsPath + '/')
  archivesPath = mergePath('', '/' + archivesPath + '/')

  return new Promise((resolve, reject) => {
    const blogPostTemplate = require.resolve(`./src/templates/template-blog-post.js`)
    const paginatedPostsTemplate = require.resolve(`./src/templates/template-blog-list.js`)
    const tagTemplate = require.resolve(`./src/templates/template-tag.js`)
    const archiveTemplate = require.resolve(`./src/templates/template-archive.js`)
    resolve(
      graphql(
        `
          {
            allStoryWriterMarkdown(
              sort: { fields: [updateDate], order: DESC }, limit: 1000
            ) {
              edges {
                node {
                  title
                  toc
                  createYear
                  docType
                  slug
                  tags
                  updateDate
                  excerpt
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        if (!result.data) {
          reject("no story writer markdown")
          return
        }
        const posts = result.data.allStoryWriterMarkdown.edges
        const blogPosts = _.filter(result.data.allStoryWriterMarkdown.edges, edge=>{
          const _docType = _.get(edge, `node.docType`)
          if (_docType ===  docType) {
            return edge
          }
          return undefined
        })
        totalPost = blogPosts.length
        if (totalPost === 0) {
          createRedirect({
            toPath: `/`,
            fromPath: `/page/1`,
            redirectInBrowser: true,
          })
        }

        // Tag pages:
        let taginfo = {};
        let yearinfo = {}
        // Iterate through each post, putting all found tags into `tags`
        blogPosts.forEach(edge => {
          const createYear = edge.node.createYear
          if (yearinfo[createYear]) {
            yearinfo[createYear]++
          } else {
            yearinfo[createYear] = 1
          }
          
          if (_.get(edge, "node.tags")) {
            edge.node.tags.forEach((tag)=>{
              tag = tag.trim()
              if (taginfo[tag]) {
                taginfo[tag]++
              } else {
                taginfo[tag] = 1
              }
            })
          }
        });
        // Make tag pages
        Object.keys(taginfo).forEach(tag => {
            const tagSlug = `${tagsPath}${_.kebabCase(tag)}/`
            const count = taginfo[tag]
            taginfo[tag] = {slug: tagSlug, count: count}
            createPage({
                path: mergePath(basePath, tagSlug),
                component: tagTemplate,
                context: {
                    tag,
                },
            });
        });
        createPage({
            path: mergePath(basePath, tagsPath),
            component: tagTemplate,
            context: {
              tag: '________none',
            },
        });
        // Archive pages:
        const nowYear = new Date().getFullYear() + ''
        yearinfo[nowYear] = 0
        Object.keys(yearinfo).forEach(year => {
          let archiveSlug = `${archivesPath}${year}/`
          if (year === nowYear) {
            archiveSlug = archivesPath
          }
          const count = yearinfo[year]
          yearinfo[year] = {slug: mergePath(basePath, archiveSlug), count: count}
          createPage({
            path: mergePath(basePath, archiveSlug),
            component: archiveTemplate,
            context: {
              year,
              yearinfo
            }
          })
        })


        blogPosts.forEach((post, index) => {
          const wrapperNode = (node)=>{
            if (node) {
              return {
                title: node.title,
                docType: node.docType,
                slug: node.slug
              }
            }
            return null;
          }
          let next = index === 0 ? null : blogPosts[index - 1].node
          next = wrapperNode(next);
          let prev =
            index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
          prev = wrapperNode(prev);
          createPage({
            path: mergePath(basePath, post.node.slug),
            component: blogPostTemplate,
            context: {
              slug: post.node.slug,
              prev,
              next
            },
          })
        })

         // pagination blogPost
        const chunkedPosts = _.chunk(blogPosts, pageSize);
        chunkedPosts.forEach((chunk, index) => {
          let path = `/page/${index+1}/`
          // 如果用户自定义了 homepage, 这里就不设置成主页
          if (!hasCustomHomePage && index === 0) {
            path = `/`
            createRedirect({
              toPath: `/`,
              fromPath: `/page/1`,
              redirectInBrowser: true,
            })
          }
          createPage({
              path: mergePath(basePath, path),
              component: paginatedPostsTemplate,
              context:
                  {
                    limit: pageSize,
                    skip: index * pageSize,
                    docType: docType,
                    numPages: Math.ceil(blogPosts.length / pageSize),
                    currentPage: index + 1,
                    hasCustomHomePage: hasCustomHomePage
                  }
              ,
          })
        })
      })
    )
  })
}


exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === `build-javascript`) {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}


exports.onCreateNode = ({ node, actions, getNodesByType, getNodes }, pluginOptions) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === 'StoryWriterMarkdown') {
    node.createYear= moment(node.createDate).format('YYYY')
    node.createYearMonth= moment(node.createDate).format('YYYYMM')
    node.createYearMonthDay= moment(node.createDate).format('YYYYMMDD')
    if (!node.cover) {
      const fileNodes = getNodesByType('File');
      const coverNodes = fileNodes.filter((node)=>{
        return node.sourceInstanceName == 'covers' && node.extension == 'png';
      });
      const coverNode = coverNodes[getRandomInt(0, coverNodes.length - 1)];
      node.cover = path.relative(path.dirname(node.fileAbsolutePath), coverNode.absolutePath);
    }
  }
}

