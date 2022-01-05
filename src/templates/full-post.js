import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'
import PostFooter from '../components/PostFooter'
import { rhythm, scale } from '../utils/typography'

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    const header = ( //todo fragment?
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
        location={this.props.location}
        title={siteTitle}
        seoDescription={post.excerpt}
        seoTitle={post.frontmatter.title}
        seoKeywords={post.frontmatter.keywords}
        isFull
      >
        {currentlyListening()}
        <div>
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </div>
        <PostFooter next={next} previous={previous} />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        currentlyListening
        keywords
        description
      }
      code {
        body
      }
    }
  }
`
