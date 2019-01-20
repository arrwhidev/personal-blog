import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Grid from '../components/Grid';
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

class PhotoPostTemplate extends React.Component {
  render() {
    const { data, pageContext, location } = this.props
    const { slug } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const post = data.mdx

    // Photos and manifest.
    const images = data.images.edges
    const manifest = data.allJson.edges
      .map(({ node }) => node)
      .filter(({ blog }) => slug.includes(blog))[0]

    return (
      <Layout location={location} title={siteTitle} isPhoto>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>[PHOTO] {post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>{post.code.body}</MDXRenderer>
        <Grid images={images} manifest={manifest} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </Layout>
    )
  }
}

export default PhotoPostTemplate

export const pageQuery = graphql`
  query($slug: String!, $absolutePathRegex: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allJson {
      edges {
        node {
          blog
          images {
            name
            type
          }
        }
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
