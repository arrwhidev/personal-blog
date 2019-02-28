import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from '../utils/typography'

export default function Bio({ isPhoto, className = '' }) {
  const styles = isPhoto
    ? {}
    : {
        display: `flex`,
      }

  const textStyles = isPhoto
    ? {}
    : {
        maxWidth: '240px',
      }

  const text = isPhoto
    ? 'Photography by'
    : 'Code & photography. Personal blog of'

  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div style={styles} className={className}>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
            />
            <p style={textStyles}>
              {`${text} `}
              <a href={`https://twitter.com/${social.twitter}`}>
                <strong>{author}</strong>.
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`
