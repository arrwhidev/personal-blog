const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const COMPONENTS = {
    'blog': path.resolve(`./src/templates/blog-post.js`),
    'full': path.resolve(`./src/templates/full-post.js`),
    'photo': path.resolve(`./src/templates/photo-post.js`)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
                mode
              }
              code {
                scope
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.edges;
    createPages(posts, createPage);
  })
}

function createPages(posts, createPage) {
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    const { mode } = post.node.frontmatter;
    let component = COMPONENTS[mode];
    if (mode == 'thoughts') {
      component = COMPONENTS['blog'];
    }

    if (!component) {
      throw new Error(`Unrecognised component for mode '${mode}'`);
    }

    createPage({
      path: post.node.fields.slug,
      component,
      context: {
        // Pass the current directory of the project as regex in context so that the GraphQL query can filter by it
        absolutePathRegex: `/^${path.dirname(post.node.fileAbsolutePath)}/`,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};