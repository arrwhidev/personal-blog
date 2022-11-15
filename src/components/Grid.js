import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { media } from '../utils/styles'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

export const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

    ${media.giant`
        max-width: ${rhythm(48)};
    `}
    ${media.desktop`
        max-width: ${rhythm(28)};
    `}
    ${media.tablet`
        max-width: ${rhythm(24)};
    `}
    ${media.phone`
        max-width: ${rhythm(24)};
    `}
`

export const GridLayout = styled.div`
    display: grid;
    grid-gap: 10px;
    padding: 10px;

    ${media.giant`
        grid-template-columns: repeat(6, 1fr);
    `}
    ${media.desktop`
        grid-template-columns: repeat(6, 1fr);
    `}
    ${media.tablet`
        grid-template-columns: 1fr;
    `}
    ${media.phone`
        grid-template-columns: 1fr;
    `}
`

export const FullImage = styled(Img)`
    ${media.giant`
        grid-column: span 6;
    `}
    ${media.desktop`
        grid-column: span 6;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const HalfImage = styled(Img)`
    ${media.giant`
        grid-column: span 3;
    `}
    ${media.desktop`
        grid-column: span 3;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const ThirdImage = styled(Img)`
    ${media.giant`
        grid-column: span 2;
    `}
    ${media.desktop`
        grid-column: span 2;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const TwoThirdsImage = styled(Img)`
    ${media.giant`
        grid-column: span 4;
    `}
    ${media.desktop`
        grid-column: span 4;
    `}
    ${media.tablet`
        grid-column: span 1;
    `}
    ${media.phone`
        grid-column: span 1;
    `}
`

const IMAGE_COMPONENTS = {
  full: FullImage,
  half: HalfImage,
  third: ThirdImage,
  twothirds: TwoThirdsImage,
}

export default class Grid extends React.Component {
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
          let blog = '';
          let images = [];

          if (this.props.manifest) {
            blog = this.props.manifest.blog;
            images = this.props.manifest.images;
          } else {
            blog = this.props.blog;
            images = this.props.images;
          }

          const imageData = data.images.edges
            .filter(node => {
              return node.node.absolutePath.includes(blog)
            })
            .map(node => node.node.childImageSharp)

          if (imageData.length < 1) {
            return (
              <Wrapper>
                <p style={{
                  textAlign: 'center',
                  backgroundColor: 'red',
                  color: 'white',
                }}>Can't find images in post: {blog}</p>
            </Wrapper>
            )
          }
          
          const renderImage = (image, size='full', alt='') => {
            const StyledImage = IMAGE_COMPONENTS[size]

            if (!StyledImage) {
              throw new Error(
                `You made a typo in the manifest - '${size}' is not a valid type!`
              )
            }

            return <StyledImage key={image.fluid.src} fluid={image.fluid} alt={alt} title={alt} />
          }

          const content = images.map(({ name, type, alt }) => {
            const img = imageData.find(image => image.fluid.src.endsWith(`/${name}`))
            if (!img) {
              return <p style={{
                textAlign: 'center',
                backgroundColor: 'red',
                color: 'white',
              }}>Can't find image with name: {name} in {blog}</p>
            }

            return renderImage(img, type, alt)
          })

          return (
            <Wrapper>
              <GridLayout>{content}</GridLayout>
            </Wrapper>
          )
        }}
      />
    )
  }
}