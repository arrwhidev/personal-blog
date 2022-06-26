import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FullImage, Wrapper, GridLayout } from './Grid'

export default class Image extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
            images: allFile(
              filter: {
                extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
              }
              sort: { fields: name, order: ASC }
            ) {
              edges {
                node {
                  absolutePath
                  childImageSharp {
                    fluid(maxWidth: 1600, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const { blog, name, alt } = this.props

          const images = data.images.edges
            .filter(node => {
              return node.node.absolutePath.includes(blog)
            })
            .map(node => node.node.childImageSharp)

          const img = images.find(image => image.fluid.src.endsWith(name))

          return (
            <Wrapper>
                <FullImage 
                  key={img.fluid.src} 
                  fluid={img.fluid} 
                  alt={alt} 
                  title={alt} 
                />
            </Wrapper>
          );
        }}
      />
    )
  }
}