import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import ManifestRenderer from '../components/ManifestRenderer'
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
      <div>
        <figure style={{
          width: '100%',
          height: `100vh`,
          overflow: 'hidden',
          margin: 0
        }}>
          <img 
          src="https://exposure.imgix.net/production/posts/68825/cover-photo/cover-1414101129.jpg?w=3600&q=50&sharp=10&fit=crop&fm=pjpg&auto=format"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: `100vh`,
          }}></img>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: `100vh`,
            }}>
            
            <div style={{ 
              display: 'block',
              position: 'relative',
              textAlign: 'center',
              marginLeft: '0px',
              marginRight: '0px',
             }}>
              <h1>Bear's Den!</h1>
            </div>

          </div>

          
          {/* <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p> */}
        </figure>

        <Layout location={location} title={siteTitle} isPhoto>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <MDXRenderer>{post.code.body}</MDXRenderer>
          <ManifestRenderer manifest={manifest} images={images} />        
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
          content {
            c
            value
            images {
              name
              type
            }
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
