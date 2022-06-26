import React from 'react'
import { Link, graphql } from 'gatsby'
import PostFooter from '../components/PostFooter'
import PhotoPostHeader from '../components/PhotoPostHeader'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'

export default class PhotoPostTemplate extends React.Component {
  render() {
    const { data, pageContext, location } = this.props
    const { previous, next } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const post = data.mdx

    const heroNode = data.images.edges.find(edge => {
      return edge.node.childImageSharp.fluid.src.endsWith('hero.jpg')
    })

    let header = null;
    let isPhoto = false;
    if (heroNode) {
      isPhoto = true;
      header = (
        <PhotoPostHeader
          date={post.frontmatter.date}
          title={post.frontmatter.title}
          heroImage={heroNode.node.childImageSharp.fluid}
        />
      )
    } else {
      header = ( //todo fragment?
        <div>
          <h3
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
              marginBottom: rhythm(-1),
            }}
          >
            <Link
              className="highlight-bg"
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `black`,
              }}
              to={`/`}>
                  {siteTitle}
            </Link>
          </h3>
          <h1>{post.frontmatter.title}</h1>
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
        </div>
      )
    }

    function currentlyListening() {
      const { currentlyListening } = post.frontmatter
      return !currentlyListening ? null : (
        <blockquote className="main-content">
          <p>Currently listening to: {currentlyListening}</p>
        </blockquote>
      )
    }

    return (
      <Layout
        header={header}
        location={location}
        title={siteTitle}
        isPhoto={isPhoto}
        seoDescription={post.excerpt}
        seoTitle={post.frontmatter.title}
        seoKeywords={post.frontmatter.keywords}
      >
        {currentlyListening()}
        <MDXRenderer>{post.code.body}</MDXRenderer>
        <PostFooter next={next} previous={previous} />
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
        currentlyListening
      }
      code {
        body
      }
    }
  }
`