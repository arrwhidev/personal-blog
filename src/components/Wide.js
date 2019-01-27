import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../utils/styles'
import { StaticQuery, graphql } from 'gatsby'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

export default class Wide extends React.Component {
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
          const { blog, name } = this.props

          const images = data.images.edges
            .filter(node => {
              return node.node.absolutePath.includes(blog)
            })
            .map(node => node.node.childImageSharp)

          const img = images.find(image => image.fluid.src.endsWith(name))

          return (
            <div
              style={{
                  height: '400px'
              }}>
                  <Img
                    fluid={img.fluid}
                    style={{
                      left: '0px',
                      objectFit: 'cover',
                      width: '100%',
                      position: 'absolute',
                    }}
                  />
            </div> 
          )
        }}
      />
    )
  }
}
