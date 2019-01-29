import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/PhotoPostHeader'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'

export default class PhotoPostTemplate extends React.Component {
  render() {
    const { data, pageContext, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const post = data.mdx
    const node = data.images.edges.find(edge => {
      return edge.node.childImageSharp.fluid.src.endsWith('hero.jpg')
    })

    const header = (
      <Header
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        heroImage={node.node.childImageSharp.fluid}
      />
    )

    return (
      <Layout
        header={header}
        location={location}
        title={siteTitle}
        isPhoto
        seoDescription={post.excerpt}
        seoTitle={post.frontmatter.title}
        seoKeywords={post.frontmatter.keywords}
      >
        <MDXRenderer>{post.code.body}</MDXRenderer>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($slug: String!, $absolutePathRegex: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    images: allFile(
      filter: {
        absolutePath: { regex: $absolutePathRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        keywords
      }
      code {
        body
      }
    }
  }
`
