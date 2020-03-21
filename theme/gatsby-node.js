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
  const contentPath =  pluginOptions.contentPath || 'post';
  const pageSize = pluginOptions.pageSize ||  8;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/template-blog-post.js`)
    const paginatedPostsTemplate = path.resolve(`src/templates/template-blog-list.js`)
    const tagTemplate = path.resolve(`src/templates/tags.js`)
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
          const docType = _.get(edge, `node.docType`)
          if (docType ===  contentPath) {
            return edge
          }
          return undefined
        })

          // Tag pages:
          let tags = [];
          // Iterate through each post, putting all found tags into `tags`
          blogPosts.forEach(edge => {
              if (_.get(edge, "node.tags")) {
                  tags = tags.concat(edge.node.tags);
              }
          });
          // Eliminate duplicate tags
          tags = _.uniq(tags);

          // Make tag pages
          tags.forEach(tag => {
              createPage({
                  path: `/tags/${_.kebabCase(tag)}/`,
                  component: tagTemplate,
                  context: {
                      tag,
                  },
              });
          });
        

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
            path: post.node.slug,
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

