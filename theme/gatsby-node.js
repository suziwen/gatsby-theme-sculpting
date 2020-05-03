//https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-449741977
const requirees6 = require("esm")(module/*, options*/)
const _ = require(`lodash`)
const fs = require(`fs`)
const Promise = require(`bluebird`)
const path = require(`path`)
const moment = require(`moment`)
const {GitalkPluginHelper} = require('gatsby-plugin-gitalk')
const mergePath = requirees6('./src/utils/merge-path').default
const MD5 = requirees6('./src/utils/md5').default
const mkdirp = require(`mkdirp`)

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

exports.createPages = async ({ graphql, actions, getNode, reporter }, pluginOptions) => {
  const site = getNode('Site')
  const {siteMetadata: {siteUrl}} = site
  const { createPage, createRedirect } = actions
  const docType =  pluginOptions.docType || 'posts';
  const pageSize = pluginOptions.pageSize ||  10;
  const basePath = pluginOptions.basePath || '/';
  let tagsPath = pluginOptions.tagsPath || 'tags';
  let archivesPath = pluginOptions.archivesPath || 'archives';
  const gitalkConfig = pluginOptions.gitalkConfig;
  tagsPath = mergePath('', '/' + tagsPath + '/')
  archivesPath = mergePath('', '/' + archivesPath + '/')

  const blogPostTemplate = require.resolve(`./src/templates/template-blog-post.js`)
  const paginatedPostsTemplate = require.resolve(`./src/templates/template-blog-list.js`)
  const tagTemplate = require.resolve(`./src/templates/template-tag.js`)
  const archiveTemplate = require.resolve(`./src/templates/template-archive.js`)

  const result = await graphql(
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
  )
  if (result.errors) {
    reporter.error(result.errors)
    return
  }

  // Create blog posts pages.
  if (!result.data) {
    reporter.warn("no story writer markdown")
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
  yearinfo[nowYear] = yearinfo[nowYear] || 0
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


  for (const [index, post] of blogPosts.entries()) {
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
    console.log('tttttttttttttttttttt')
    console.log(pluginOptions)
    console.log(GitalkPluginHelper)
    if (pluginOptions.gitalk && pluginOptions.gitalkCreateIssueToken) {
      //如果用户使用了像 github action, 并提供了 创建 issue 的 Token, 就直接先创建 issue
      console.log('create issue')
      const issueOptions = Object.assign({}, pluginOptions.gitalk, {
        id: MD5(post.node.slug || post.node.id),
        title: post.node.title,
        description: post.node.excerpt,
        url: siteUrl + mergePath(basePath, post.node.slug),
      }, {
        accessToken: pluginOptions.gitalkCreateIssueToken
      })
      await GitalkPluginHelper.createIssue(issueOptions)
      reporter.info(`create issue: ${post.node.title}`)
    }
  }

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

