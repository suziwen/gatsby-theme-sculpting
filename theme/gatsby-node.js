const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)


const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.createPages = ({ graphql, actions }, pluginOptions) => {
  const { createPage, createRedirect } = actions
  const docType =  pluginOptions.docType || 'posts';
  const pageSize = pluginOptions.pageSize ||  8;
  const basePath = pluginOptions.basePath || '/';

  return new Promise((resolve, reject) => {
    const blogPostTemplate = require.resolve(`./src/templates/template-blog-post.js`)
    const paginatedPostsTemplate = require.resolve(`./src/templates/template-blog-list.js`)
    const tagTemplate = require.resolve(`./src/templates/template-tag.js`)
    const tagsTemplate = require.resolve(`./src/templates/template-tags.js`)
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

          // Tag pages:
          let taginfo = {};
          // Iterate through each post, putting all found tags into `tags`
          blogPosts.forEach(edge => {
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
              const tagSlug = `/tags/${_.kebabCase(tag)}/`
              const count = taginfo[tag]
              taginfo[tag] = {slug: tagSlug, count: count}
              createPage({
                  path: tagSlug,
                  component: tagTemplate,
                  context: {
                      tag,
                  },
              });
          });
        createPage({
          path: `/tags/`,
          component: tagsTemplate,
          context: {
            allTags: taginfo
          }
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
          let slug = basePath + '/' + post.node.slug;
          // 删除多个重复的 / 符号
          slug = slug.replace(/\/+/g, `/`)
          createPage({
            path: slug,
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
          let path = `/`
          if (index > 0) {
            path = `/page/${index+1}/`
          }
          createPage({
              path: path,
              component: paginatedPostsTemplate,
              context:
                  {
                    limit: pageSize,
                    skip: index * pageSize,
                    docType: docType,
                    numPages: Math.ceil(blogPosts.length / pageSize),
                    currentPage: index + 1,
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


exports.onCreateNode = ({ node, actions, getNodesByType, getNodes }) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === 'StoryWriterMarkdown') {
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

