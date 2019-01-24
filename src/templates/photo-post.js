import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

export default class PhotoPostTemplate extends React.Component {
  render() {
    const { data, pageContext, location } = this.props
    const { slug } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const post = data.mdx
    const node = data.images.edges
      .find(edge => {
        return edge.node.childImageSharp.fluid.src.endsWith('hero.jpg')
      })

    return (
      <div>
        <Header 
          date={post.frontmatter.date} 
          title={post.frontmatter.title} 
          heroImage={node.node.childImageSharp.fluid}
        />  
        <Layout location={location} title={siteTitle} isPhoto>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <MDXRenderer>{post.code.body}</MDXRenderer>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />
        </Layout>
      </div>
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
      }
      code {
        body
      }
    }
  }
`
