import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCameraRetro } from '@fortawesome/free-solid-svg-icons'
library.add(faCode)
library.add(faCameraRetro)

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const keywords = [`blog`, `development`, `javascript`, `photography`]
    const header = (
      <div>
        <h1
          style={{
            ...scale(1.3),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {siteTitle}
          </Link>
        </h1>
        <Bio />
      </div>
    )

    return (
      <Layout
        title={siteTitle}
        seoKeywords={keywords}
        header={header}
        seoDescription={'Personal blog of Arran White. Code & photography.'}
      >
        {posts.map(({ node }) => {
          const icon =
            node.frontmatter.mode === 'photo' ? 'camera-retro' : 'code'
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} className="main-content">
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  <FontAwesomeIcon
                    icon={icon}
                    style={{
                      color: '#1d262f',
                      marginRight: '8px',
                      height: '27px',
                    }}
                  />
                  {` ${title}`}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            mode
            description
          }
        }
      }
    }
  }
`
